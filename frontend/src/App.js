import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import StoreProvider from "./provider/StoreProvider";
function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Routes />
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;

// The Routing Strategy Without Authentication
// <>
//   <Router>
//     <Routes>
//       {/* Login Page */}
//       <Route path="/login" element={<Login />} />
//       {/* Registeration Page */}
//       <Route path="/signup" element={<Signup />} />
//       {/* Client Side */}
//       <Route path="/*" element={<MainLayout />} />
//       {/* Admin Panel */}
//       <Route path="/admin/*" element={<Admin />} />
//     </Routes>
//   </Router>
// </>
