import { getStroke } from "./node_modules/perfect-freehand/dist/esm/index.js"
import { strokeToSvg } from "./strokeToSvgPath.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const boundary = canvas.getBoundingClientRect()

let mouseIn = false
let mouseDown = false
let mousePath = []

canvas.addEventListener("mouseenter", () => (mouseIn = true))
canvas.addEventListener("mouseleave", () => (mouseIn = false))

// Handle touch events
canvas.addEventListener("touchstart", (ev) => {
  console.log({ start: ev })
})
canvas.addEventListener("touchend", (ev) => {
  console.log({ end: ev })
})
canvas.addEventListener("touchcancel", (ev) => {
  console.log({ cancel: ev })
})

// handle draw using touch
canvas.addEventListener("touchmove", (ev) => {
  const pos = ev.targetTouches?.[0]
  // Get x and y coordinates of a point
  var x = pos.clientX - boundary.left
  var y = pos.screenY - boundary.top

  mousePath = [...mousePath, [x, y]]
  draw(mousePath)
})

// handle mousedown events
document.addEventListener("mousedown", () => (mouseDown = true))
document.addEventListener(
  "mouseup",
  () => ((mouseDown = false), (mousePath = []))
)

// handle draw using curser
document.addEventListener("mousemove", (ev) => {
  if (!mouseIn) return

  // Get x and y coordinates of a point
  var x = ev.clientX - boundary.left
  var y = ev.screenY - boundary.top

  if (mouseDown) {
    mousePath = [...mousePath, [x, 50]]
    draw(mousePath)
  }
})

function draw(params) {
  const stroke = getStroke(mousePath)
  const svgPath = strokeToSvg(stroke)

  // make canvas path
  const canvasPath = new Path2D(svgPath)
  ctx.fill(canvasPath)
  ctx.fillStyle = "white"
}
