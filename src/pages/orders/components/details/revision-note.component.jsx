import { Button, Card, CardBody } from "reactstrap";

export const RevisionNote = ({ note, onEdit }) => {
  return (
    <Card>
      <CardBody>
        <h4 className="text-center font-bold">Nota del pedido:</h4>
        <p className="my-4 text-center">{note}</p>
        <div className="flex item-center justify-center">
          <Button className="btn-warning" onClick={onEdit}>
            Editar nota
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
