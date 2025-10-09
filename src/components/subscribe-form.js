/** @jsx jsx */
import { jsx } from "theme-ui"
import { useEffect } from "react"

const SubscribeForm = () => {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://link.msgsndr.com/js/form_embed.js"
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
      <div
        style={{
          maxWidth: "380px",
          margin: "0 auto",
          background: "#fff",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}
      >
      <h3>✉️ Get notified of new posts</h3>
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/1AUUWwZ4TsJTKM9TpwDy"
        style={{
          width: "100%",
          maxWidth: "300px",
          height: "150px",
          border: "none",
          borderRadius: "6px",
        }}
        id="inline-1AUUWwZ4TsJTKM9TpwDy"
        title="bijanrahnamai-email"
      />
    </div>
  )
}

export default SubscribeForm