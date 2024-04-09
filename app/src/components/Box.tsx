"use client"
import { CSSProperties, FC, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from "@/constants/itemTypes";

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}

export interface BoxProps {
  name: string
}

interface DropResult {
  name: string
}

export const Box: FC<BoxProps> = function Box({name}) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: {name},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1;
  const ref = useRef(null);
  drag(ref);
  return (
    <div ref={ref} style={{...style, opacity}} data-testid={`box`}>
      {name}
    </div>
  )
}
