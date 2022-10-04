import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import DotMenu from './menu/DotMenu';
import { Grid } from '@mui/material';

export default function StoreCard({ data, storeid, handleEdit }) {
    let navigate = useNavigate();

    function handleViewDetails() {
        navigate(`storedetails/${storeid}`);
    }
    function handleAction(e) {
        if (e == 'edit') {
            handleEdit()
        }
    }
    return (
        <Card sx={{ minWidth: 345 }}>
            <Grid container justifyContent={'space-between'} px={{ sx: 0 }}>
                <Grid item sx={6} >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.address}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data.contact}
                        </Typography>




                    </CardContent>
                </Grid>
                <Grid item sx={6}>
                    <DotMenu handleAction={(e) => { handleAction(e) }} />

                    <CardMedia
                        component="img"
                        height="140"
                        image="data:image/png;base64,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"
                        alt="green iguana"
                    />
                </Grid>

            </Grid>
            <CardActions>
                <Button variant="outlined" size="small" onClick={handleViewDetails} fullWidth>Items</Button>
            </CardActions>

            {/* <DotMenu handleAction={(e) => { handleAction(e) }} />
            <CardMedia
                component="img"
                height="140"
                image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEXnHSz////mABfnGirmABzlAADnFSbmABbmDSH+9PXmABLmESPmAA/mCR/97u//+/v85+jtY2vpNkLwhoz2ur3rTlf72tz1rLD61dfveoH74OLylZrqP0rzn6T+9/jrVF3oKDbqRlDvc3r4xcjwh43taHD1sbX4ys3oJDL4x8rznqPxkJX0pqvub3bpMD/sW2TeNW8XAAAKk0lEQVR4nO2c6XbiuhJGwbKFRzBDEiBhygAZ4f3f7mCVbH8SIp17u9s6Z63avxKMvTSUaja9HsMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDPNfRobZ792fyT80kt9Dxq5xiGwQnVbj4vtbi+trIIPoOJ58f383BLvFgz1FkQXyNOufubgEXyrCh+nqxTmH89Rv9sn5/q/4T471/yJYnccxMecRHMd3ZV9xc22GMugtbqtvvFzuYhZM6Fq/Pwv+wpj/J4L7y1Hmd0lfk7wK110izG9Weg0+Q/tqOJ6v6wfc+Z6hfFBj2eBOhR/9hkPqvCv8KJuvrOwZBov2/v7Ct5QGn9Uwyh7slAiSXwxQbpcwh3drhvIBLvZ3nrWp6A2VoKEoFbAFSegS0sEB5/BsqZr8Fi4aa+eD+PFyoQMY4d3AcZOc4AT7j+Y260d+K+UdQrsxx2FkJxig01aEn8YMN5Yexi3s31+ooW6Rx8vDls7a8S0j113R0Jjh0ZDD+MW4OP49p+i3Ce7UYcMtNETQPmKKbGzMoW8KcmhsYXL0fAwHylQYeiZcteMbOY0hbnKFsc/W9Jf5353Ar4hJa27hIIkQRNDpj4heYkyiNGaYzo2Lvu19roYzx3U2NKHzEJm60rpdbsyLU7+Ot7xRozB84wiO0dI5vPTNnMQMz2F0MC9+47d3wUDpmaGEwyZ3MLwPl6YXR1NIDbdUr1nD2u8xFK+X/gxqkdHRtQHo8SjQ1ORP5rWD3xnqsaI/I7brdnhPzuEFlhz2T+39hgRUXDjl3RKQnkFjGD7D8Jx6RmytSWBoadsRz/ZeLzh6laKAmKF0+jPF1JrEurWZ8mFkXXT67Z1B/swwhkEY5trtUeZzaxLLdpvoiYB7kTojVwtu6JkAFYXTnxHSFtJ58wCxrZ6YtKFx/8lrYKH9mYmhZ2DkT664qVc89y1acxi+V//vwSf68Grvo0t/JryHkbuVxIWQwixIKDD2uprF6gKHnjGiomXmFFKKtjCH8VWvBGV37mCT3Y57V5A/YyQpfqBnSEiTvWufArU+Ao7yrU8h1fkZw/XPweFcux1KEtIZmL1koteI/IdZBPs7cx7ljnDkZww98+b0Z+REuTxjWIqy9mpT5bLvYniI18BC+zNG6It6xpHH7jVCimH8rV4KSl48RahoNh4VjU5pLmCRRQiGbJhLmV3Wa2hdnlAj7bUkkrs6zt/hIVuPioZSFcPXa3rmYzDZfD3u7FTvUQnpYwTf1BqJwqbbIEVF49Pek97boyYwvOYkUXO5Mw8SKZNkm8E3dew0UHc/xri9PjMYer9qRS9lMRgcIW6qsQwaJVcPEWbj6KyJXvV3mQsBl3wqmlwN9TaqirRhmk1OHzMjB1izxPC/9kmnAeRi1pQtJIdtWhii7tGj0XZhkaeDycvH29KOeVoRNHZBW5jXAlJRCUnioMpsrHNDHydOr6gb9Dg2H7PSyrkYDMempiEtcsgLKL5RPpQO6CrQx5GYe8tgiDgq+z+g7FnnKFUfPxeYM54pfZkrR+Yoezk8+dOLopFZEG5f7FyDk0RYx0gLqRQBuKUqEUOn7+yjGWmeReeKRpyVyuTlzqlSHJzs0iiZk7MPgwlTFTuR+J61qqFoJt0qGhGn8fj99rtjZ7KyvWaRqZvPFj4H57ry7ig9U3mAGB+POs1giFwsZj+fXTXewlaEen/OMUcKT6pcd9XMoSJNb4pGbK1E7S85XCbJKM20LMzKzPk/ISs/pqz0SgC726lHg6rhJ5TT6GKCIlNq8mwRdPcGEdUJn6oCII7gsz122YNhV4u+Zbj/KhxaUBeVzuoEy0vDqK7lVN6PUXhylgT+GsWP7AOxzWOXL0J+WRXv4nqdDxsFYsouGk0c3doKUZx+ehLnV0KeQu1UFY1g1vsp7aXqCKikByqaQ9f2PovsbDwsN7o4ZKdFGBYBipmu7leJNfQ994EQo2ZdQkg1egidUvC12skt99MdVjUTFZfL1/f57WwDbin5ookQdRcV8RlSLUcVWQ0l66ElUYTWYSwP9+NjHhQZxnQqPSZeaVen7RQpyabqbSiL96EyEKVQ64LdXj6Kv6Jt9BnN918PvTRU8Q326VGmO9ebum4cLxHQlIuemfZeBCrzRJ1tqIJKL8lgEez2ZJI3eRA3wS1mOMvKlVHp8LtKNTX5bF3kUPek6LRF1Ybq5CqWnuaeUqUyUtu4RHtglN5XgZ7OUKUFm5wi+dbkiGWgmDavSb8pFqdwnv2ETk3l3sjYB6iBVIY4+6rKinOQUhGum/tED2b4MG1E+ywMv2ra7AA6KSOjExHTpJTercovo+qw7euNyKhXTU1YbME121ZWsqQtNEqLvnI0uhPxaouPrpTpHMCwaQ0lA7FUE5YT2Col4bopBXsah566SusMFDpUaN3qsrv+bNNIGu0zGXGjWK8Mh16wENLdvnI05I2sMUUoJAhp3f2SK0fso/HfWq+7Z3WUVJOd6e+hnbxsbu8Gkr6Z0WuJQqoDnvQdp9urV0ZLnt321Bw5zG91n6NRGFuhQRuW0BQG5ME+DURcSy1VDQf4lIal3i4hQXo9ta8PlPANjfxJAAtPUyjqHt84WKyUZyInI9hhe4Z1ky1+PvJj74VUStB4d8AQOWXWdBBxntPj21m5VF8mG1N3+1ozbJqAMajypGi02zi5JqRUzSWf9H5GWkRZxGCGo7bOYXOqUSl7qjpRmnNuaLmLYhiNfxl90Wenalupa7juKrG68061Y2c45F48Gl2DN0pexn6oHkPK2L9ENI03NWn6uw6H9HPqjW8UM3ZPd5ujqaFzYvbOo2SR70UbfU8B1VA1gFPQ1bSoGV5b22RrZ+A8QCkGs9MsBU1KGgjjg/6X+oiiq9aGF5j0aLwzTOj7UTR1ogVPiCGkOsbD1Kqy29rVa11p7MZvm2xRle69KBrySxIjU4g5Jf12TIZvvKgwloYOVQgsH7bNb7g0fhQN+VTmi1oDqEPVMWOdwejf6X4nKjmBdAvRHMRhu1kD2FkvDfo6S2SEbUaUUPe+iFCF87eb6E11o4hQ+QmYo48bm98eToyLEy+hU2AqRAWmqKEPNt0tpps0E/GiWg95MhaAHlannFr3U3t29CwvgQWVn823PbEjGF/hknGhRq56ouisWoNOn+2poC/nRdHoARiW2EjgXi3Ykua0ezHTT2tZYpAHL6ET+Z9mig+XfX5t2fUbMnbaRVRKKgHRRQfXR8OeiEtbFM03Qa+2L5H1KC9aY+RuOIKUOL5n4qVhj9SF9ZZP2C776Kp+Jw21v4z3stcHIyfZznDpIzikU2K9TQhlhutuFnlxrq52sxkFPAXHcvx9qhwvVCE0YVNncL4MS9+p9vAn72eFL7W58NKwJ8S8X95c+FKDelTXT448LkcHZ1HYpjhqD+nkJXQSxc71Kyvhw/B7Ia1+o2Sb/kxzSCpurH29guBe2FgZg+/l6scDFsqFKD2/22wTVwHUn3rDTMqlv6rTVYqb1Z9rQBODxfO/bYLVD7H8Sc0Q/xt+NIlhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIa55B+EDZHNgpmyLAAAAABJRU5ErkJggg=="
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.contact}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button size="small" onClick={handleViewDetails}>Items</Button>
            </CardActions> */}
        </Card>
    )
}
