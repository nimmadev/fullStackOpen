import {
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material"
import { useUsers } from "../hooks/usersHook"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

const UserRow = ({ user }) => {
  return (
    <TableRow>
      <TableCell component={Link} to={`/users/${user.id}`}>
        {user.name}
      </TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  )
}

export const Users = () => {
  const { users } = useUsers()
  console.log(users)
  if (!users) return null
  return (
    <>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#9c9c9c" }}>
              <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Username
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Blog created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserRow user={user} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
