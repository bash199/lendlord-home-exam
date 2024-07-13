import cx from "clsx";
import { useState, useEffect } from "react";
import { Table, ScrollArea, Input } from "@mantine/core";
import { IconTrash, IconEdit, IconCancel, IconArrowBarUp } from "@tabler/icons-react";

import classes from "./UsersTable.css";
import axios from "axios";

function UsersTable({ trigger, setedit, setShown, setnewUser, shown2 }) {
   const [scrolled, setScrolled] = useState(false);
   const [editing, setEditing] = useState(false);
   const [trigger2, settrigger2] = useState(false);
   const [rows, setrows] = useState([]);
   const [data, setData] = useState([]);

   useEffect(() => {
      const fetch = async () => {
         try {
            const { data } = await axios.get("http://localhost:3000/users");
            setData(data);
         } catch (error) {
            console.error(error);
         }
      };
      fetch();
   }, [trigger, trigger2, shown2]);

   let manager = {};

   const axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
   });

   const deleteUser = async (id) => {
      try {
         await axiosInstance.delete(`/delete/${id}`);
         settrigger2((old) => !old);
      } catch (error) {
         console.error(error);
      }
   };

   const updateUser = async (id) => {
      try {
         await setnewUser(id);
         setShown((prev) => !prev);
         setedit((old) => !old);
         // await axiosInstance.put(`/updateUser/${id}`, data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      const rowss = data.map((row, i, arr) => {
         if (row.role == "Driver" || (row.role == "Worker" && row.manager != manager?._id)) {
            const managerObject = arr.find((item) => String(item._id) === String(row.manager)); // Adjust comparison as per your object structure
            manager = managerObject;
         }

         const date = new Date(row.dateStarted).toLocaleDateString();
         return (
            <Table.Tr key={row._id}>
               <Table.Td>
                  {editing ? <Input size="xs" defaultValue={row.firstName} /> : row.firstName}
               </Table.Td>
               <Table.Td>{row.lastName}</Table.Td>
               <Table.Td>{row.email}</Table.Td>
               <Table.Td>{date}</Table.Td>
               <Table.Td>{row.role}</Table.Td>
               <Table.Td>€{row.salary}</Table.Td>
               <Table.Td>{row.role === "Manager" ? "" : manager?.firstName}</Table.Td>
               <Table.Td>
                  {editing ? null : (
                     <IconEdit title="Edit" className="hover" onClick={() => updateUser(row)} />
                  )}
                  {editing ? null : (
                     <IconTrash title="Delete" className="hover" onClick={() => deleteUser(row._id)} />
                  )}
               </Table.Td>
            </Table.Tr>
         );
      });

      setrows(rowss);
   }, [data, editing]);

   return (
      <ScrollArea h={500} pt={20}>
         <Table striped highlightOnHover withTableBorder miw={700}>
            <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
               <Table.Tr>
                  <Table.Th>First name</Table.Th>
                  <Table.Th>Last Name </Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Date Started</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Salary</Table.Th>
                  <Table.Th>Manager</Table.Th>
                  <Table.Th>Actions</Table.Th>
               </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
         </Table>
      </ScrollArea>
   );
}

export default UsersTable;
