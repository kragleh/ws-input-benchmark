"use client"
import React, { useEffect } from 'react'

const HomePage = () => {
  const [inputs, setInputs] = React.useState<{ inputName: string, time: number }[]>([])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/api/ws')

    socket.onopen = () => {
      console.log('WebSocket connected')
    }

    socket.onmessage = (event) => {
      console.log('WebSocket message:', event.data)

      const message = JSON.parse(event.data.toString())

      if (message.event === 'input') {
        setInputs(inputs => [...inputs, { inputName: message.inputName, time: message.time }])
      }
    }

    socket.onclose = () => {
      console.log('WebSocket closed')
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    document.addEventListener('keydown', (event) => {
      socket.send(JSON.stringify({ event: 'input', inputName: event.key, time: Date.now() }))
    })

    return () => {
      socket.close()
    }
  }, [])

  return (
    <section className='flex flex-col gap-4'>
      { 
        inputs.map((input, index) => (
          <div key={ index }>{ input.inputName } - { input.time } ms</div>
        ))
      }
    </section>
  )
}

export default HomePage