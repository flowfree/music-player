'use server'

import { PrismaClient, type Track } from '@prisma/client'

export type TrackWithRelatedData = Track & {
  artists: {
    id: number
    name: string
  }[]
  genres: {
    id: number
    name: string
  }[]
}

interface ListOfTrackResponse {
  success: boolean
  message?: string
  data?: TrackWithRelatedData[]
}

interface PaginationParam {
  take?: number
  skip?: number
}

const prisma = new PrismaClient()

export async function fetchAllTracks(
  pagination?: PaginationParam
): Promise<ListOfTrackResponse> {
  try {
    const result = await prisma.track.findMany({
      include: {
        artists: {
          select: {
            artist: {
              select: { id: true, name: true }
            }
          }
        },
        genres: {
          select: {
            genre: {
              select: { id: true, name: true }
            }
          }
        }
      },
      skip: pagination?.skip,
      take: pagination?.take
    })
    const data = result.map(track => ({
      ...track,
      artists: track.artists.map(relation => relation.artist),
      genres: track.genres.map(relation => relation.genre)
    }))
    return { success: true, data }
  } catch (err) {
    return { success: false, message: `${err}` }
  }
}
