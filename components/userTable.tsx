"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    loyaltyPoints: number
}

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([])
    const [search, setSearch] = useState("")
    const { toast } = useToast()

    const fetchUsers = async () => {
        const res = await fetch("/api/admin/users")
        const data = await res.json()
        setUsers(data)
    }

    const deleteUser = async (id: string) => {
        try {
            const res = await fetch("/api/admin/users", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
            // const res = await fetch(`/api/admin/users/${id}`, {
            //     method: "DELETE",
            // })

            if (!res.ok) {
                const error = await res.json()
                throw new Error(error?.error || "Erreur lors de la suppression.")
            }

            setUsers(users.filter(u => u.id !== id))

            toast({
                title: "Utilisateur supprimé",
                description: "Le compte a bien été supprimé.",
                variant: "default",
            })
        } catch (err: any) {
            toast({
                title: "Erreur",
                description: err.message || "Impossible de supprimer cet utilisateur.",
                variant: "destructive",
            })
        }
    }


    useEffect(() => {
        fetchUsers()
    }, [])

    const filteredUsers = users.filter(
        user =>
            user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
            />

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="bg-[#f4e9dc] text-[#241f18] font-semibold font-title">
                        <tr>
                            <th className="px-4 py-2">Prénom</th>
                            <th className="px-4 py-2">Nom</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Points</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="border-t">
                                <td className="px-4 py-2">{user.firstName}</td>
                                <td className="px-4 py-2">{user.lastName}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.loyaltyPoints}</td>
                                <td className="px-4 py-2">
                                    <Button
                                        variant="destructive"
                                        className="bg-red-500 hover:bg-red-600 text-white"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-4 text-center text-gray-400">
                                    Aucun utilisateur trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
