import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'
import mongoose from 'mongoose'

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB()
    const prompts = await Prompt.findById(params.id).populate('creator')

    if (!prompts) {
      return new Response('Prompt not found', { status: 404 })
    }
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch all prompt', { status: 500 })
  }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()

  try {
    await connectToDB()
    const existPrompt = await Prompt.findById(params.id)

    if (!existPrompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    existPrompt.prompt = prompt
    existPrompt.tag = tag
    await existPrompt.save()

    return new Response(JSON.stringify(existPrompt), { status: 200 })
  } catch (error) {
    return new Response('Fail to update the prompt', { status: 500 })
  }
}

// DELETE (delete)

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndRemove(params.id)

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Failed to deleted Prompt', { status: 500 })
  }
}
