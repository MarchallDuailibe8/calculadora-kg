"use client"

import type React from "react"

import { useState } from "react"
import { Calculator, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PriceCalculator() {
  const [weight, setWeight] = useState("")
  const [price, setPrice] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const calculatePricePerKg = () => {
    setError("")
    setResult(null)

    const weightNum = Number.parseFloat(weight)
    const priceNum = Number.parseFloat(price)

    if (!weight || !price) {
      setError("Por favor, preencha ambos os campos.")
      return
    }

    if (isNaN(weightNum) || isNaN(priceNum)) {
      setError("Por favor, insira valores numéricos válidos.")
      return
    }

    if (weightNum <= 0) {
      setError("O peso deve ser maior que zero.")
      return
    }

    if (priceNum <= 0) {
      setError("O preço deve ser maior que zero.")
      return
    }

    const weightInKg = weightNum / 1000
    const pricePerKg = priceNum / weightInKg

    setResult(pricePerKg)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculatePricePerKg()
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      <Card
        className={`w-full max-w-md shadow-lg transition-colors ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
        }`}
      >
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2 relative">
            <Calculator className={`h-8 w-8 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <button
              onClick={toggleDarkMode}
              className={`absolute right-0 p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                  : "bg-white hover:bg-gray-100 text-gray-600"
              } shadow-md`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
          <CardTitle className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Calculadora de Preço por Kg
          </CardTitle>
          <CardDescription className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Calcule o valor por quilograma do seu produto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="weight"
                className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Peso do produto (g)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="Ex: 150"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`text-lg ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}`}
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="price"
                className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Preço total (R$)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Ex: 6.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`text-lg ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : ""}`}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={calculatePricePerKg} className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700" size="lg">
            <Calculator className="mr-2 h-5 w-5" />
            Calcular
          </Button>

          {result !== null && (
            <div
              className={`border rounded-lg p-6 text-center ${
                isDarkMode ? "bg-green-900 border-green-700" : "bg-green-50 border-green-200"
              }`}
            >
              <p className={`text-sm font-medium mb-2 ${isDarkMode ? "text-green-300" : "text-green-600"}`}>
                Valor por quilograma:
              </p>
              <p className={`text-3xl font-bold ${isDarkMode ? "text-green-200" : "text-green-800"}`}>
                R$ {result.toFixed(2)}/kg
              </p>
            </div>
          )}

          <div className={`rounded-lg p-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
            <h3 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Exemplo:</h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Peso: 150g | Preço: R$ 6,00</p>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Resultado: R$ 40,00/kg</p>
          </div>
          <footer className={`pt-4 text-center ${isDarkMode ? "border-gray-600" : "border-gray-200"} border-t`}>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>by Duailibe</p>
          </footer>
        </CardContent>
      </Card>
    </div>
  )
}
