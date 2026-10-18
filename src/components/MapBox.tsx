import './MapBox.css'

export interface MapBoxProps {
  title: string
  description: string
}

/** A small solid info box (Figma `map / box`). */
export function MapBox({ title, description }: MapBoxProps) {
  return (
    <div className="pf-mapbox">
      <p className="pf-mapbox__title">{title}</p>
      <p className="pf-mapbox__description">{description}</p>
    </div>
  )
}
