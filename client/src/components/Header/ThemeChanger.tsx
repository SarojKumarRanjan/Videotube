import { useState } from "react"
import { useTheme } from "../ThemeProvider"
import { Switch } from "../ui/switch"

export function ModeToggle() {
  const [isChecked, setIsChecked] = useState(true) 
  const { setTheme } = useTheme()

  const handleChange = (checked:boolean) => {
    setIsChecked(checked)
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="">
      <Switch
        checked={isChecked}
        onCheckedChange={handleChange}
      />
    </div>
  )
}
