import React from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import { useEffect, useState } from 'react'
import Markdown from "react-markdown"
import axios from "axios"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function App() {
  const [code, setCode] = useState(``)
  const [review, setReview] = useState('')

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await
      // axios.post("http://localhost:3000/ai/get-review", { code })
      axios.post(`${import.meta.env.VITE_API_URL}/ai/get-review`, { code })
    setReview(response.data)
  }

  return (
    <>
      <div className="h-screen w-full">
        <main className="h-full w-full p-6 flex gap-4">

          {/* LEFT SIDE */}
          <div className="h-full basis-1/2 rounded-lg bg-black relative">
            <div className="h-full w-full m-0 rounded-lg bg-[#0c0c0c]">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16,
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
            <div
              onClick={reviewCode}
              className="absolute bottom-4 right-4 bg-indigo-100 text-black px-8 py-2 font-medium cursor-pointer select-none rounded-lg"
            >
              Review
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="h-full basis-1/2 rounded-lg bg-[#343434] p-4 px-8 text-base overflow-auto">
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
          </div>

        </main>
      </div>

    </>
  )
}
