import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { UserListContext } from "../../context/Context";

// Search
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
import UpdateUserPassword from "./UpdateUserPassword";
import DeleteUserPopUp from "./DeleteUserPopUp";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  backgroundColor: "#ffedd5", // bg-orange-100
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  "&:hover": { backgroundColor: "#fed7aa" }, // bg-orange-200
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// / Const Id's for selcect search and switch case
const FILTER_NAME = {
  ID: "id",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  ROLE: "role",
  STATUS: { LABEL: "status", ACTIVE: "Active", IN_ACTIVE: "Inactive" },
  DATE_JOINED: "dateJoined",
};

// Define Table Data
function createData(
  id,
  firstName,
  lastName,
  email,
  role,
  status,
  dateJoined,
  userid
) {
  return {
    id, // set serail number
    firstName,
    lastName,
    email,
    role,
    status,
    dateJoined,
    userid, // set user id
  };
}

// These rows are filled via context in the main component
// const rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Table heads
const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "S.No",
  },
  {
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "dateJoined",
    numeric: false,
    disablePadding: false,
    label: "Date Joined",
  },
  {
    id: "userid",
    numeric: false,
    label: "Action",
  },
];

function UserTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
// Define prop types (what is the type of props that passed to it?)
UserTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function UserTableToolbar(props) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {
        <>
          {/* Table Heading */}
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h5"
            id="tableTitle"
            component="div"
            color="orange"
          >
            Users List
          </Typography>

          {/* Select filter type with search */}
          <select
            onChange={props.onSearchFilter}
            className="bg-orange-100 p-2 rounded-md"
          >
            <option value={FILTER_NAME.ID}>S.No</option>
            <option value={FILTER_NAME.FIRST_NAME}>First Name</option>
            <option value={FILTER_NAME.LAST_NAME}>Last Name</option>
            <option value={FILTER_NAME.EMAIL}>Email</option>
            <option value={FILTER_NAME.ROLE}>Role</option>
            <option value={FILTER_NAME.STATUS.LABEL}>Status</option>
            <option value={FILTER_NAME.DATE_JOINED}>Date Joined</option>
          </select>

          {/* Search Icon and Input */}
          <Search>
            <SearchIconWrapper>🔎 {/* <SearchIcon /> */}</SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={props.onSearch}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </>
      }
    </Toolbar>
  );
}

/**
 * This is the enhanced table with search and filters
 * @returns Table with data
 */
export default function UserTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [showUpdatePassword, setShowUpdatePassword] = React.useState(false);
  const [showDeleteUser, setShowDeleteUser] = React.useState(false);
  const [clickedUserId, setClickedUserId] = React.useState("");

  // Define rows via functin create Data defined at the top
  const [rows, setRows] = React.useState([]);
  const [searchFilter, setSearchFilter] = React.useState("id"); // default filter type is id (S.No)

  // Get users via provider
  const listOfUsers = React.useContext(UserListContext);

  // Define initial rows - which remain same all the time and below @function onSearch use it for filtering search
  let irows = React.useMemo(
    () =>
      listOfUsers.map((user, index) =>
        createData(
          index + 1,
          user.firstName,
          user.lastName,
          user.email,
          user.role,
          user.active,
          user.createdAt.split("T")[0],
          user._id
        )
      ),
    [listOfUsers]
  );

  /**
   * Initially set the rows vis useState
   *  * NOTE: Do not add the rows as dependecy, becuase when user search for a row. So, the row as dependency will cause the re-render of the table due which use willl not be able to search
   */
  React.useEffect(() => {
    setRows(irows);
  }, [listOfUsers, irows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  // Set Search Filter according to table columns
  const onSearchFilter = (e) => {
    setSearchFilter(e.target.value);
  };
  /**
   * * Custom Search And Filter
   * This is a custom searh fucntion. Which filter out results from rows.
   * It capter each key press and filter each row via specified property.
   * When searched array is greater than 0. Then it update rows via setRow
   * And when searched array is not greater than zero. The row has its own inital values
   *
   *
   * * NOTE: This use 'irows' instead of 'rows' which are defined via 'useState'. Because this will not filter properly, as the rows state gets updated when search is found. So imagine searing via S.No. For typing 1 will result in search, and will updated rows to searchedRows, now the rows state is upated. So, when user type 1 another time basically (11). It will look for the result in updated rows, which were filtered out earlier. So, user will not get results. To avoid this, all these filter uses 'irows' which reamin same and does not change. And will result in right filter all the time.
   *
   *
   *  * Note: Debounding is not used. As we are just filtering the array object. Not sending request to server. So, it is pretty fine. incase of sending request to sever for search and filter 'Debounce Technique' should be used.
   *
   *
   * @param {*} e
   *
   * Simple Description: Filter and Search content within in 'irows' and update 'rows' state after search
   */
  const onSearch = (e) => {
    let searchContent = e.target.value;
    let searchedRows = [];

    // Check which search filter is on and then filter out data from initial rows (irows)
    switch (searchFilter) {
      case FILTER_NAME.ID:
        searchedRows = irows.filter(
          (row) => row.id === parseInt(searchContent)
        );
        break;

      case FILTER_NAME.FIRST_NAME:
        searchedRows = irows.filter((row) => row.firstName === searchContent);
        break;

      case FILTER_NAME.LAST_NAME:
        searchedRows = irows.filter((row) => row.lastName === searchContent);
        break;

      case FILTER_NAME.EMAIL:
        searchedRows = irows.filter((row) => row.email === searchContent);
        break;

      case FILTER_NAME.ROLE:
        searchedRows = irows.filter((row) => row.role === searchContent);
        break;

      case FILTER_NAME.STATUS.LABEL:
        // Based on status true or false filter admins
        if (searchContent === FILTER_NAME.STATUS.IN_ACTIVE)
          searchedRows = irows.filter((row) => row.status === false);
        else if (searchContent === FILTER_NAME.STATUS.ACTIVE)
          searchedRows = irows.filter((row) => row.status === true);
        break;

      case FILTER_NAME.DATE_JOINED:
        searchedRows = irows.filter((row) => row.dateJoined === searchContent);
        break;

      default:
        // In default case - filter out via email
        searchedRows = irows.filter((row) => row.email === searchContent);
    }

    // When search content is found then update table
    if (searchedRows.length > 0) {
      setRows(searchedRows); // Update table with the searched rows
      return;
    }

    // Update rows as when no match found, the table should return to initial state
    setRows(irows);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <UserTableToolbar onSearch={onSearch} onSearchFilter={onSearchFilter} />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <UserTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell id={labelId} align="center">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.firstName}</TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.role}</TableCell>
                    <TableCell align="left">
                      {row.status ? (
                        <div className="flex gap-2 items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          Active{" "}
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                          Inactive{" "}
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="left">{row.dateJoined}</TableCell>
                    <TableCell align="left">
                      {/* Update Button */}
                      <button
                        className="mr-2"
                        onClick={(e) => {
                          !showUpdatePassword
                            ? setShowUpdatePassword(true)
                            : setShowUpdatePassword(false);
                          // set user id
                          setClickedUserId(row.userid);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-blue-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        className="ml-2"
                        onClick={(e) => {
                          !showDeleteUser
                            ? setShowDeleteUser(true)
                            : setShowDeleteUser(false);
                          // set user id
                          setClickedUserId(row.userid);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/*  */}

        {/* User Password Update Popup */}
        {showUpdatePassword && (
          <div className="mt-12 absolute top-0 right-0 left-0 bottom-0">
            <UpdateUserPassword
              setShowUpdatePassword={setShowUpdatePassword}
              clickedUserId={clickedUserId}
            />
          </div>
        )}
        {/* User Delete Confirmation Popup */}
        {showDeleteUser && (
          <div className="mt-12 absolute top-0 right-0 left-0 bottom-0">
            <DeleteUserPopUp
              setShowDeleteUser={setShowDeleteUser}
              clickedUserId={clickedUserId}
            />
          </div>
        )}
      </Paper>
    </Box>
  );
}
