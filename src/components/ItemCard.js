import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DotMenu from './menu/DotMenu';
import { Badge, Box, Grid } from '@mui/material';

export default function ItemCard({ data, storeid, handleEdit, handleSell }) {
    let navigate = useNavigate();
    const { pathname } = useLocation();

    function handleViewDetails() {
        navigate(`storedetails/${storeid}`);
    }


    function handleAction(e) {
        if (e == 'edit') {
            handleEdit()
        }
    }



    return (
        // <Badge color="primary" badgeContent={data.quantityRemaining}>
        <Card >
            <Grid container justifyContent={'space-between'} px={{ sx: 0 }}>
                <Grid item sx={6} >
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div" sx={{ mb: 0 }}>

                            {data.name}

                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {data.category}
                        </Typography>


                        <Typography variant="h2" color="text.secondary" >
                            $ {data.sellPrice}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" >
                            Custo: $ {data.sellPrice}
                        </Typography>




                    </CardContent>
                </Grid>
                <Grid item sx={6}>
                    <DotMenu handleAction={(e) => { handleAction(e) }} />

                    <CardMedia
                        component="img"
                        height="140"
                        image={pathname == '/items' ? `imgs/${data.category}.jpg` : `../../imgs/${data.category}.jpg`}
                        // image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEXnHSz////mABfnGirmABzlAADnFSbmABbmDSH+9PXmABLmESPmAA/mCR/97u//+/v85+jtY2vpNkLwhoz2ur3rTlf72tz1rLD61dfveoH74OLylZrqP0rzn6T+9/jrVF3oKDbqRlDvc3r4xcjwh43taHD1sbX4ys3oJDL4x8rznqPxkJX0pqvub3bpMD/sW2TeNW8XAAAKk0lEQVR4nO2c6XbiuhJGwbKFRzBDEiBhygAZ4f3f7mCVbH8SIp17u9s6Z63avxKMvTSUaja9HsMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDPNfRobZ792fyT80kt9Dxq5xiGwQnVbj4vtbi+trIIPoOJ58f383BLvFgz1FkQXyNOufubgEXyrCh+nqxTmH89Rv9sn5/q/4T471/yJYnccxMecRHMd3ZV9xc22GMugtbqtvvFzuYhZM6Fq/Pwv+wpj/J4L7y1Hmd0lfk7wK110izG9Weg0+Q/tqOJ6v6wfc+Z6hfFBj2eBOhR/9hkPqvCv8KJuvrOwZBov2/v7Ct5QGn9Uwyh7slAiSXwxQbpcwh3drhvIBLvZ3nrWp6A2VoKEoFbAFSegS0sEB5/BsqZr8Fi4aa+eD+PFyoQMY4d3AcZOc4AT7j+Y260d+K+UdQrsxx2FkJxig01aEn8YMN5Yexi3s31+ooW6Rx8vDls7a8S0j113R0Jjh0ZDD+MW4OP49p+i3Ce7UYcMtNETQPmKKbGzMoW8KcmhsYXL0fAwHylQYeiZcteMbOY0hbnKFsc/W9Jf5353Ar4hJa27hIIkQRNDpj4heYkyiNGaYzo2Lvu19roYzx3U2NKHzEJm60rpdbsyLU7+Ot7xRozB84wiO0dI5vPTNnMQMz2F0MC9+47d3wUDpmaGEwyZ3MLwPl6YXR1NIDbdUr1nD2u8xFK+X/gxqkdHRtQHo8SjQ1ORP5rWD3xnqsaI/I7brdnhPzuEFlhz2T+39hgRUXDjl3RKQnkFjGD7D8Jx6RmytSWBoadsRz/ZeLzh6laKAmKF0+jPF1JrEurWZ8mFkXXT67Z1B/swwhkEY5trtUeZzaxLLdpvoiYB7kTojVwtu6JkAFYXTnxHSFtJ58wCxrZ6YtKFx/8lrYKH9mYmhZ2DkT664qVc89y1acxi+V//vwSf68Grvo0t/JryHkbuVxIWQwixIKDD2uprF6gKHnjGiomXmFFKKtjCH8VWvBGV37mCT3Y57V5A/YyQpfqBnSEiTvWufArU+Ao7yrU8h1fkZw/XPweFcux1KEtIZmL1koteI/IdZBPs7cx7ljnDkZww98+b0Z+REuTxjWIqy9mpT5bLvYniI18BC+zNG6It6xpHH7jVCimH8rV4KSl48RahoNh4VjU5pLmCRRQiGbJhLmV3Wa2hdnlAj7bUkkrs6zt/hIVuPioZSFcPXa3rmYzDZfD3u7FTvUQnpYwTf1BqJwqbbIEVF49Pek97boyYwvOYkUXO5Mw8SKZNkm8E3dew0UHc/xri9PjMYer9qRS9lMRgcIW6qsQwaJVcPEWbj6KyJXvV3mQsBl3wqmlwN9TaqirRhmk1OHzMjB1izxPC/9kmnAeRi1pQtJIdtWhii7tGj0XZhkaeDycvH29KOeVoRNHZBW5jXAlJRCUnioMpsrHNDHydOr6gb9Dg2H7PSyrkYDMempiEtcsgLKL5RPpQO6CrQx5GYe8tgiDgq+z+g7FnnKFUfPxeYM54pfZkrR+Yoezk8+dOLopFZEG5f7FyDk0RYx0gLqRQBuKUqEUOn7+yjGWmeReeKRpyVyuTlzqlSHJzs0iiZk7MPgwlTFTuR+J61qqFoJt0qGhGn8fj99rtjZ7KyvWaRqZvPFj4H57ry7ig9U3mAGB+POs1giFwsZj+fXTXewlaEen/OMUcKT6pcd9XMoSJNb4pGbK1E7S85XCbJKM20LMzKzPk/ISs/pqz0SgC726lHg6rhJ5TT6GKCIlNq8mwRdPcGEdUJn6oCII7gsz122YNhV4u+Zbj/KhxaUBeVzuoEy0vDqK7lVN6PUXhylgT+GsWP7AOxzWOXL0J+WRXv4nqdDxsFYsouGk0c3doKUZx+ehLnV0KeQu1UFY1g1vsp7aXqCKikByqaQ9f2PovsbDwsN7o4ZKdFGBYBipmu7leJNfQ994EQo2ZdQkg1egidUvC12skt99MdVjUTFZfL1/f57WwDbin5ookQdRcV8RlSLUcVWQ0l66ElUYTWYSwP9+NjHhQZxnQqPSZeaVen7RQpyabqbSiL96EyEKVQ64LdXj6Kv6Jt9BnN918PvTRU8Q326VGmO9ebum4cLxHQlIuemfZeBCrzRJ1tqIJKL8lgEez2ZJI3eRA3wS1mOMvKlVHp8LtKNTX5bF3kUPek6LRF1Ybq5CqWnuaeUqUyUtu4RHtglN5XgZ7OUKUFm5wi+dbkiGWgmDavSb8pFqdwnv2ETk3l3sjYB6iBVIY4+6rKinOQUhGum/tED2b4MG1E+ywMv2ra7AA6KSOjExHTpJTercovo+qw7euNyKhXTU1YbME121ZWsqQtNEqLvnI0uhPxaouPrpTpHMCwaQ0lA7FUE5YT2Col4bopBXsah566SusMFDpUaN3qsrv+bNNIGu0zGXGjWK8Mh16wENLdvnI05I2sMUUoJAhp3f2SK0fso/HfWq+7Z3WUVJOd6e+hnbxsbu8Gkr6Z0WuJQqoDnvQdp9urV0ZLnt321Bw5zG91n6NRGFuhQRuW0BQG5ME+DURcSy1VDQf4lIal3i4hQXo9ta8PlPANjfxJAAtPUyjqHt84WKyUZyInI9hhe4Z1ky1+PvJj74VUStB4d8AQOWXWdBBxntPj21m5VF8mG1N3+1ozbJqAMajypGi02zi5JqRUzSWf9H5GWkRZxGCGo7bOYXOqUSl7qjpRmnNuaLmLYhiNfxl90Wenalupa7juKrG68061Y2c45F48Gl2DN0pexn6oHkPK2L9ENI03NWn6uw6H9HPqjW8UM3ZPd5ujqaFzYvbOo2SR70UbfU8B1VA1gFPQ1bSoGV5b22RrZ+A8QCkGs9MsBU1KGgjjg/6X+oiiq9aGF5j0aLwzTOj7UTR1ogVPiCGkOsbD1Kqy29rVa11p7MZvm2xRle69KBrySxIjU4g5Jf12TIZvvKgwloYOVQgsH7bNb7g0fhQN+VTmi1oDqEPVMWOdwejf6X4nKjmBdAvRHMRhu1kD2FkvDfo6S2SEbUaUUPe+iFCF87eb6E11o4hQ+QmYo48bm98eToyLEy+hU2AqRAWmqKEPNt0tpps0E/GiWg95MhaAHlannFr3U3t29CwvgQWVn823PbEjGF/hknGhRq56ouisWoNOn+2poC/nRdHoARiW2EjgXi3Ykua0ezHTT2tZYpAHL6ET+Z9mig+XfX5t2fUbMnbaRVRKKgHRRQfXR8OeiEtbFM03Qa+2L5H1KC9aY+RuOIKUOL5n4qVhj9SF9ZZP2C776Kp+Jw21v4z3stcHIyfZznDpIzikU2K9TQhlhutuFnlxrq52sxkFPAXHcvx9qhwvVCE0YVNncL4MS9+p9vAn72eFL7W58NKwJ8S8X95c+FKDelTXT448LkcHZ1HYpjhqD+nkJXQSxc71Kyvhw/B7Ia1+o2Sb/kxzSCpurH29guBe2FgZg+/l6scDFsqFKD2/22wTVwHUn3rDTMqlv6rTVYqb1Z9rQBODxfO/bYLVD7H8Sc0Q/xt+NIlhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIa55B+EDZHNgpmyLAAAAABJRU5ErkJggg=="
                        alt="green iguana"
                    />
                </Grid>

            </Grid>
            <CardActions>
                <Button variant="outlined" size="small" onClick={handleSell} fullWidth>Vender</Button>
            </CardActions>

        </Card>
        // {/* </Badge> */ }
    )
}
