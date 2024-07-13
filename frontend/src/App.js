import React, { useState, useEffect } from "react";
import { MantineProvider, Input, Select } from "@mantine/core";

import "./App.css";
import "@mantine/core/styles.css";
import GenericModal from "./components/modal";
import UsersTable from "./components/table";
import Header from "./components/header";
import { IconArrowBarUp, IconCancel } from "@tabler/icons-react";
import axios from "axios";

function App() {
   const [shown, setShown] = useState(false);
   const [shown2, setShown2] = useState(false);
   const [edit, setedit] = useState(false);
   const [newUser, setnewUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      dateStarted: "",
      salary: 0,
   });

   const [oldUser, setoldUser] = useState({
      firstName: "",
      lastName: "",
      email: "",
      dateStarted: "",
      salary: 0,
   });

   const toggleModal = () => {
      setShown((prev) => !prev);
      setnewUser({
         firstName: "",
         lastName: "",
         email: "",
         dateStarted: "",
         salary: 0,
         role: "",
         manager: "",
      });
   };

   const toggleModal2 = () => {
      setShown2((prev) => !prev);
   };

   const axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
   });

   const createUser = async (data) => {
      try {
         await axiosInstance.post(`/new/`, data);
         setShown((prev) => !prev);
      } catch (error) {
         console.error(error);
      }
   };

   const updateUser = async (id, data) => {
      try {
         await axiosInstance.put(`/updateUser/${id}`, data);
         toggleModal2();
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <MantineProvider>
         <div className="App">
            <Header />
            <div id="content">
               <button onClick={toggleModal}>Add User</button>
               <GenericModal displayModal={shown} closeModal={toggleModal}>
                  <h1>Add New User</h1>
                  <Input.Wrapper label="First Name">
                     <Input
                        required
                        size="xs"
                        value={newUser?.firstName}
                        onChange={(e) => setnewUser({ ...newUser, firstName: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Input.Wrapper label="Last Name">
                     <Input
                        required
                        size="xs"
                        value={newUser?.lastName}
                        onChange={(e) => setnewUser({ ...newUser, lastName: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Input.Wrapper label="Email">
                     <Input
                        required
                        size="xs"
                        value={newUser?.email}
                        onChange={(e) => setnewUser({ ...newUser, email: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Input.Wrapper label="Date Started">
                     <Input
                        required
                        size="xs"
                        type="date"
                        value={newUser?.dateStarted}
                        onChange={(e) => setnewUser({ ...newUser, dateStarted: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Input.Wrapper label="Salary">
                     <Input
                        required
                        type="number"
                        size="xs"
                        value={newUser?.salary}
                        onChange={(e) => setnewUser({ ...newUser, salary: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Select
                     comboboxProps={{ position: "top", middlewares: { flip: false, shift: false } }}
                     label="Your favorite library"
                     placeholder="Pick Role"
                     data={["Manager", "Worker", "Driver"]}
                     value={newUser?.role}
                     onChange={(_value) => setnewUser({ ...newUser, role: _value })}
                     styles={{
                        dropdown: {
                           zIndex: 1999,
                        },
                     }}
                  />
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        marginTop: "10px",
                     }}
                  >
                     <IconArrowBarUp p title="Save" className="hover" onClick={() => createUser(newUser)} />
                     <IconCancel title="Cancel" className="hover" onClick={toggleModal} />
                  </div>
               </GenericModal>
               <GenericModal displayModal={shown2} closeModal={toggleModal2}>
                  <h1>Update User</h1>
                  <Input.Wrapper label="First Name">
                     <Input
                        required
                        size="xs"
                        value={oldUser?.firstName}
                        onChange={(e) => setnewUser({ ...oldUser, firstName: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Input.Wrapper label="Last Name">
                     <Input
                        required
                        size="xs"
                        value={oldUser?.lastName}
                        onChange={(e) => setoldUser({ ...oldUser, lastName: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Input.Wrapper label="Email">
                     <Input
                        required
                        size="xs"
                        value={oldUser?.email}
                        onChange={(e) => setoldUser({ ...oldUser, email: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Input.Wrapper label="Date Started">
                     <Input
                        required
                        size="xs"
                        type="date"
                        value={oldUser?.dateStarted}
                        onChange={(e) => setoldUser({ ...oldUser, dateStarted: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Input.Wrapper label="Salary">
                     <Input
                        required
                        type="number"
                        size="xs"
                        value={oldUser?.salary}
                        onChange={(e) => setoldUser({ ...oldUser, salary: e.target.value })}
                     />
                  </Input.Wrapper>
                  <Select
                     comboboxProps={{ position: "top", middlewares: { flip: false, shift: false } }}
                     label="Your favorite library"
                     placeholder="Pick Role"
                     data={["Manager", "Worker", "Driver"]}
                     value={oldUser?.role}
                     onChange={(_value) => setoldUser({ ...oldUser, role: _value })}
                     styles={{
                        dropdown: {
                           zIndex: 1999,
                        },
                     }}
                  />
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        marginTop: "10px",
                     }}
                  >
                     <IconArrowBarUp
                        p
                        title="Save"
                        className="hover"
                        onClick={() => updateUser(oldUser._id, oldUser)}
                     />
                     <IconCancel title="Cancel" className="hover" onClick={toggleModal2} />
                  </div>
               </GenericModal>
               <UsersTable
                  trigger={shown}
                  setedit={setedit}
                  setShown={setShown2}
                  setnewUser={setoldUser}
                  shown2={shown2}
               />
            </div>
         </div>
      </MantineProvider>
   );
}

export default App;
