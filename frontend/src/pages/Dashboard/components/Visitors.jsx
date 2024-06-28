import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  fetchVisitorsRequest,
  addVisitorRequest,
  updateVisitorRequest,
  deleteVisitorRequest,
//   fetchVisitorsRequestSearch,
} from "../../../redux/action";
import styles from "./Visitors.module.css";

const Visitors = () => {
  const dispatch = useDispatch();
  const { visitors, isLoading, newVis } = useSelector(
    (state) => state.visitors
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [filterRole, setFilterRole] = useState("Visitor");

  useEffect(() => {
    handleSearch();
    dispatch(fetchVisitorsRequest({ role: filterRole }));
  }, [dispatch, filterRole, newVis]);

  const handleEdit = (visitor) => {
    setSelectedVisitor(visitor);
    setEditModalOpen(true);
  };

  const handleDelete = (visitor) => {
    setSelectedVisitor(visitor);
    setDeleteModalOpen(true);
  };

//   const handleFilterChange = (e) => {
//     setFilterRole(e.target.value);
//   };

  const handleSearch = () => {
//     dispatch(fetchVisitorsRequestSearch({ role: filterRole }));
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateVisitorRequest(selectedVisitor));
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteVisitorRequest(selectedVisitor._id));
    setDeleteModalOpen(false);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newVisitor = Object.fromEntries(formData.entries());
    dispatch(addVisitorRequest(newVisitor));
    setAddModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className={styles.container}>
      <h2>Visitor List</h2>
      <div className={styles.filterSection}>
        {/* <div className={styles.left}>
          <label>Filter By Role: </label>
          <select value={filterRole} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Admin">Admin</option>
            <option value="Client">Client</option>
            <option value="Visitor">Visitor</option>
            <option value="Investor">Investor</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div> */}
        <div className={styles.right}>
          <button className="btn btn-primary mb-2" onClick={handleAdd}>Add People</button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Visit Date</th>
            <th>Email ID</th>
            <th>City</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors && visitors.length > 0 ? (
            visitors.map((visitor, index) => (
              <tr key={visitor._id}>
                <td>{index + 1}</td>
                <td>{visitor.name}</td>
                <td>{formatDate(visitor.visitDate)}</td>
                <td>{visitor.email}</td>
                <td>{visitor.city}</td>
                <td>{visitor.role}</td>
                <td>
                  <button
                    className={`${styles.actionButton} ${styles.editButton} mb-2`}
                    onClick={() => handleEdit(visitor)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleDelete(visitor)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No visitors found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {isLoading && <p>Loading...</p>}
      {/* {error && <p>{error}</p>} */}

      {editModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Visitor</h3>
            <form onSubmit={handleEditSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={selectedVisitor.name}
                  onChange={(e) =>
                    setSelectedVisitor({
                      ...selectedVisitor,
                      name: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Visit Date:
                <input
                  type="date"
                  value={selectedVisitor.visitDate}
                  onChange={(e) =>
                    setSelectedVisitor({
                      ...selectedVisitor,
                      visitDate: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={selectedVisitor.email}
                  onChange={(e) =>
                    setSelectedVisitor({
                      ...selectedVisitor,
                      email: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  value={selectedVisitor.city}
                  onChange={(e) =>
                    setSelectedVisitor({
                      ...selectedVisitor,
                      city: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Role:
                <select
                  value={selectedVisitor.role}
                  onChange={(e) =>
                    setSelectedVisitor({
                      ...selectedVisitor,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="Admin">Admin</option>
                  <option value="Client">Client</option>
                  <option value="Visitor">Visitor</option>
                  <option value="Investor">Investor</option>
                </select>
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditModalOpen(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this user?</p>
            <button
              className={styles.confirmButton}
              onClick={handleDeleteConfirm}
            >
              Yes
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setDeleteModalOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      )}

      {addModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Add Visitor</h3>
            <form onSubmit={handleAddSubmit}>
              <label>
                Name:
                <input type="text" name="name" required />
              </label>
              <label>
                Visit Date:
                <input type="date" name="visitDate" required />
              </label>
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                City:
                <input type="text" name="city" required />
              </label>
              <label>
                Role:
                <select name="role" required>
                  <option value="Admin">Admin</option>
                  <option value="Client">Client</option>
                  <option value="Visitor">Visitor</option>
                  <option value="Investor">Investor</option>
                </select>
              </label>
              <button type="submit">Add</button>
              <button type="button" onClick={() => setAddModalOpen(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitors;
