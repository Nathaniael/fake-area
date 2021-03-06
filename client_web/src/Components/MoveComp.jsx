import React from 'react'
import Moveable from "react-moveable";
import { idContainerActionMoveable, idContainerReactionMoveable } from './Utils'

function isColliding(elem, otherElem) {
    var rect = elem.getBoundingClientRect()
    var rectSelection = otherElem.getBoundingClientRect()

    if(rect.top + rect.height > rectSelection.top
        && rect.left + rect.width > rectSelection.left
        && rect.bottom - rect.height < rectSelection.bottom
        && rect.right - rect.width < rectSelection.right) {
            return true
    }
}

function MoveComp({selector, addElemToArea}) {
    const [initialPos, setInitialPos] = React.useState(null)

    return (
        <Moveable
            target={document.getElementById(selector)}
            container={null}
            zoom={0}
            origin={true}
            edge={false}
            draggable={true}
            throttleDrag={0}
            renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
            onDrag={({
                target,
                transform,
            }) => {
                if (initialPos == null) {
                    setInitialPos(transform)
                }
                target.style.transform = transform;
            }}
            onDragEnd={({
                target
            }) => {
                var action = document.getElementById(idContainerActionMoveable)
                var reaction = document.getElementById(idContainerReactionMoveable)
                if (isColliding(action, target)) {
                    addElemToArea(true)
                } else if (isColliding(reaction, target)) {
                    addElemToArea(false)
                }
                target.style.transform = initialPos
                setInitialPos(null)
            }}
        />
    )
}

export default MoveComp
