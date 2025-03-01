"use client"

import { useState } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

// Mapping of instruments to their images
const instrumentImages = {
  violin: "/images/instruments/violin.jpg", // Local path to the uploaded image
  viola: "/placeholder.svg?height=400&width=600&text=viola",
  cello: "/placeholder.svg?height=400&width=600&text=cello",
  bass: "/placeholder.svg?height=400&width=600&text=bass",
  piano: "/placeholder.svg?height=400&width=600&text=piano",
} as const

type Instrument = {
  id: number
  name: string
}

export function InstrumentSelector({ instruments }: { instruments: Instrument[] }) {
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null)

  const getInstrumentImageUrl = (name: string) => {
    // Convert instrument name to lowercase for consistent matching
    const instrumentKey = name.toLowerCase() as keyof typeof instrumentImages
    return instrumentImages[instrumentKey] || `/placeholder.svg?height=400&width=600&text=${name}`
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Select an Instrument</h2>
        <Select onValueChange={setSelectedInstrument} value={selectedInstrument || undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Choose an instrument" />
          </SelectTrigger>
          <SelectContent>
            {instruments.map((instrument) => (
              <SelectItem key={instrument.id} value={instrument.name}>
                {instrument.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedInstrument && (
        <Card className="overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={getInstrumentImageUrl(selectedInstrument) || "/placeholder.svg"}
              alt={`${selectedInstrument} instrument`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </Card>
      )}
    </div>
  )
}

