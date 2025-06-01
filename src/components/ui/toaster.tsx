// src/components/ui/toaster.tsx
"use client"

import * as React from "react"
import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner 
      richColors 
      position="top-right"
      expand={true}
      closeButton={true}
    />
  )
}