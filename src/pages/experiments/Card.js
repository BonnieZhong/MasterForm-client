import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import cardImage from './card_img.jpg';
import './Card.css';

const CardComponent = ({ experiment }) => {

  const navigate = useNavigate();
  const pathName = experiment.title.toLowerCase().replaceAll(' ', '-');

  const onClick = () => {
    navigate(`/${pathName}`);
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="150"
          image={cardImage}
          alt="card image"
        />
        <CardContent>
          <h3 className="card-title">{experiment.title}</h3>
          <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet at odio ac luctus. Sed nec placerat mauris. Aliquam at nisl mi.</p>
        </CardContent>
        <CardActions>
          <Button size="medium" className="card-btn" variant="contained" onClick={onClick} >Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
};
export default CardComponent;
