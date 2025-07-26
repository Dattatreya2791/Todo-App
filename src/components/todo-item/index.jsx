import { Card, CardContent, Typography, CardActions, Button} from "@mui/material";


function TodoItem({todo, fetchDetailsOfCurrentTodo}) {
    console.log(todo);
    return (
    <Card sx={{
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent : 'space-between'
    }}>
        <CardContent>
            <Typography variant="h5" color={"text.secondary"}>
                {todo?.todo}
            </Typography>
        </CardContent>

        <CardActions>
            <Button
                onClick={() => fetchDetailsOfCurrentTodo(todo.id)}
                //size = "small"
             sx={{
                backgroundColor: 'black',
                color: 'white',
                opacity : "0.7",
                '&:hover': {
                    backgroundColor: 'black',
                    color: 'white',
                    opacity : '1'
                },
            }}> Details</Button>
        </CardActions>
    </Card>
    );
}

export default TodoItem;