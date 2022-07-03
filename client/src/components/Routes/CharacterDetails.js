import React, {useState, useEffect } from 'react';

import Home from './Home.js'
import {Link} from 'react-router-dom'
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  }));
  




function CharacterDetails({match}) {
  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    useEffect(() => {
        fetchResults();
        console.log("match", match)
    }, []);

    const [result, setResult] = useState ({
      sprites: {}
    });

    const fetchResults = async () => {
        const data = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${match.params.name}`
        );

        const results = await data.json();
        console.log("results:",result);
        console.log(match.params.name);
        setResult(results);
        };

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

        return (
          <main>  
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                title={result.name} 
              />
              <CardMedia
                component="img"
                height="194"
                image={result.sprites.front_default} alt="Logo"
                alt="Sorry you cant see our badass Pokemon"
              />
        
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" >
                  {/* <Favorites favorite={result.name}/> */}
                  <FavoriteIcon />
                  
                </IconButton>
        
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Height: {result.height}</Typography>
                  <Typography paragraph>Weight: {result.weight}</Typography>
                </CardContent>
              </Collapse>
            </Card>
            </main>  
          );
        }
      
export default CharacterDetails;