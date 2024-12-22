import { Dialog } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "../ui/table"
import { useState } from "react"
import AdminOrderDetailsView from "./Order-Details"




const AdminOrders = () => {
     const[openchange, setopenchange] = useState(false)
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Order History</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>12345</TableCell>
                            <TableCell>27/12/24</TableCell>
                            <TableCell>In Process</TableCell>
                            <TableCell>$100</TableCell>
                            <TableCell>
                                <Dialog open={openchange} onOpenChange={setopenchange}>
                                    <Button onClick={()=>setopenchange(true)}>View Details</Button>
                                    <AdminOrderDetailsView/>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOrders