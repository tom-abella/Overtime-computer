
"use client";
import { ThemeProvider } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import MainScreen from "./components/mainscreen";
export default function Home() {
  return (
    <ThemeProvider>
      <MainScreen/>
    </ThemeProvider>
  )
}
