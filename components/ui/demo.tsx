"use client"

import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing"

export default function Demo() {
  return (
    <WavingPortfolioLanding
      name="Impresos Americana"
      year="1992 - 2026"
      roles={["Material POP de Piso", "Litografía Industrial"]}
      lettersLeft={["P", "F"]}
      giantLetter="O"
      lettersRight={["RT", "LIO"]}
      title="Impresos Americana - Litografía & Material POP"
      signature="IA/CALI"
      accent="#E30613"
      paper="#F8F8F6"
      ink="#18181B"
      showCharacter={false}
      height="100vh"
    />
  )
}
