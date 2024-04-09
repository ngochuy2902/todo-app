"use client";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd'
import React from 'react';
import { Dustbin } from "@/components/Dustbin";
import { Box } from "@/components/Box";

export default function Todo() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div style={{overflow: 'hidden', clear: 'both'}}>
          <Dustbin/>
        </div>
        <div style={{overflow: 'hidden', clear: 'both'}}>
          <Box name="Glass"/>
          <Box name="Banana"/>
          <Box name="Paper"/>
        </div>
      </DndProvider>
    </div>
  )
}