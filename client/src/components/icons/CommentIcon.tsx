import React, { ComponentProps } from 'react'

const CommentIcon: React.FC<ComponentProps<'svg'>> = ({...props}) => {
  return (
    <svg width="30px" height="30px" viewBox="0 0 32 32" version="1.1" {...props}>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
            <g id="Icon-Set-Filled" transform="translate(-154.000000, -257.000000)" fill="#000000">
                <path d="M177,270 L163,270 C162.448,270 162,269.553 162,269 C162,268.448 162.448,268 163,268 L177,268 C177.552,268 178,268.448 178,269 C178,269.553 177.552,270 177,270 L177,270 Z M175,276 L165,276 C164.448,276 164,275.553 164,275 C164,274.447 164.448,274 165,274 L175,274 C175.552,274 176,274.447 176,275 C176,275.553 175.552,276 175,276 L175,276 Z M170,257 C161.164,257 154,263.269 154,271 C154,275.419 156.345,279.354 160,281.919 L160,289 L167.009,284.747 C167.979,284.907 168.977,285 170,285 C178.836,285 186,278.732 186,271 C186,263.269 178.836,257 170,257 L170,257 Z" id="comment-2" >
                </path>
            </g>
        </g>
    </svg>
  )
}

export default CommentIcon