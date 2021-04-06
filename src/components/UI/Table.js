import React from "react";
import MaterialTable from "material-table";
import PropTypes from "prop-types";

const Table = React.forwardRef((props, ref) => {
  return (
    <MaterialTable
      tableRef={ref || null}
      title={props.title || ""}
      isLoading={props.isLoading}
      columns={props.columns}
      data={props.rows}
      actions={props.actions}
      options={{
        rowStyle: {
          backgroundColor: "#2a3042",
          borderBottom: "1px solid #32394e",
          color: "#fff",
          fixedColumns: {
            left: 2,
            right: 0,
          },
        },
        headerStyle: {
          backgroundColor: "rgba(195, 203, 228, 0.05)",
          color: "#fff",
          border: "1px solid #32394e",
          fontWeight: "bold",
          textTransform: "uppercase",
        },
        searchFieldStyle: {
          color: "#fff",
        },
        actionsColumnIndex: -1,
        loadingType: "linear",
        ...props.options,
      }}
      localization={{
        header: {
          actions: "Acciones",
        },
        body: { emptyDataSourceMessage: "No hay valores para mostrar" },
        toolbar: { searchPlaceholder: "Buscar", exportCSVName: "Exportar CSV", exportTitle: "Exportar", exportAriaLabel: "Exportar archivo", exportPDFName: "Exportar PDF" },
        pagination: { labelRowsSelect: "entradas", labelDisplayedRows: "{from}-{to} de {count}" },
      }}
    />
  );
});

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
  actions: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default Table;
