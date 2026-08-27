import { useEffect, useState } from 'react'

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controle = new AbortController()
    const signal = controle.signal

    async function buscar() {
      try {
        setCarregando(true)
        setErro(null)
        const resp = await fetch('https://jsonplaceholder.typicode.com/users', { signal })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = await resp.json()
        setUsuarios(data)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(e.message)
        }
      } finally {
        setCarregando(false)
      }
    }

    buscar()

    return () => controle.abort()
  }, [])

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro}</p>

  return (
    <ul>
      {usuarios.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}