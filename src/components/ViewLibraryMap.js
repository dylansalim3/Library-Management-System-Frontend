import React, {useEffect, useRef, useState} from 'react';
import Box from "@material-ui/core/Box";
import {CardActionArea, Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import ImageModal from "./imageViewer/ImageModal";
import PropTypes from "prop-types";
import EditLibraryMapCard from "../pages/admin/EditLibraryMap/EditLibraryMapCard";
import * as axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const ViewLibraryMap = (props) => {
    const [libraryMaps, setLibraryMaps] = useState([]);

    const loading = libraryMaps.length === 0;

    useEffect(() => {
        if (!loading) {
            return undefined;
        }
        getLibraryMaps();
    }, [loading]);

    const getLibraryMaps = () => {
        axios.get('library-maps/get-library-maps').then(result => {
            setLibraryMaps(result.data);
        }).catch(err => {
            console.log(err.toString());
        })
    }

    let imageModal = useRef(null);

    const openImageModal = (index) => {
        imageModal.current.open(index);
    }

    return !loading ? (<Box width="100%">

            <h2 className="textCenter">Library Map</h2>
            <Box p={1}>
                <Box>
                    {/*<h3>{`Floor ${libraryMap.floor.toString()}`}</h3>*/}
                    <Grid container direction="row" justify="center" spacing={4}>
                        {libraryMaps.map((libraryMap, index) => {
                            return (
                                <Grid key={libraryMap.id} item xs={12} md={6}>
                                    <Card>
                                        <CardHeader title={libraryMap.name}/>
                                        <CardActionArea onClick={() => openImageModal(index)}>
                                            <CardMedia style={{
                                                height: 0,
                                                paddingTop: '56.25%',
                                            }} image={libraryMap.image_url}
                                                       title={libraryMap.name}/>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>


            </Box>

            <ImageModal
                showPreview
                showIndex
                activeIndex={0}
                images={libraryMaps.map(libraryMap => {
                    return {src: libraryMap.image_url, title: libraryMap.name,}
                })}
                ref={imageModal}/>

        </Box>) : <Box width="100%" display="flex" justifyContent="center">
        <CircularProgress color="inherit" size={20}/>
    </Box>;

    // );
}

EditLibraryMapCard.propTypes = {
    libraryMaps: PropTypes.array,
};

export default ViewLibraryMap;