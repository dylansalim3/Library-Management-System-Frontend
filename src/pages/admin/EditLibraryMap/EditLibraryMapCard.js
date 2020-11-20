import React, {useRef, useState, lazy, Suspense} from 'react';
import {CardActionArea, Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import * as axios from "axios";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Clear, Publish} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import PropTypes from 'prop-types';

const ImageModal = lazy(() => import("../../../components/imageViewer/ImageModal"));


const EditLibraryMapCard = props => {
    const {libraryMaps} = props;
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
    const [selectedLibraryMap, setSelectedLibraryMap] = useState({});
    // const [imageModalVisible, setImageModalVisible] = useState(false);
    let imageModal = useRef(null);

    const openImageModal = (index) => {
        imageModal.current.open(index);
    }

    const onDeleteLibraryMap = (libraryMap) => {
        setSelectedLibraryMap(libraryMap);
        setOpenConfirmationDialog(true);
    }

    const confirmRemoveMap = () => {
        setOpenConfirmationDialog(false);
        axios.post('library-maps/delete-library-map', {id: selectedLibraryMap.id}).then(result => {
            props.onShowSuccessSnackbar(true);
            props.onUpdateLibraryMap();
        }).catch(err => {
            props.onShowErrorSnackbar(true);
        });
    }

    const onCloseDialog = () => {
        setSelectedLibraryMap({});
        setOpenConfirmationDialog(false);
    }

    const onChangeFile = (e, libraryMap) => {
        if (e.target.files) {
            const uploadedImageFile = e.target.files[0];
            const formData = new FormData();
            formData.append('file', uploadedImageFile);
            formData.append('floor', libraryMap.floor);
            formData.append('name', libraryMap.name);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            axios.post('library-maps/update-library-map', formData, config).then(result => {
                props.onShowSuccessSnackbar(true);
                props.onUpdateLibraryMap();
            }).catch(err => {
                props.onShowErrorSnackbar(true);
            });
        }
    }

    return (
        <Box width="100%">
            {libraryMaps.length===0?'':(<h2 className="textCenter">Edit Library Map</h2>)}

            <Box p={1}>
                <Box>
                    {/*<h3>{`Floor ${libraryMap.floor.toString()}`}</h3>*/}
                    <Grid container direction="row" justify="center" spacing={4}>
                        {libraryMaps.map((libraryMap, index) => {
                            return (
                                <Grid key={libraryMap.id} item xs={12} md={6}>
                                    <Card>
                                        <CardHeader title={libraryMap.name} action={
                                            <Tooltip title="Delete" aria-label="delete">
                                                <IconButton aria-label="deleteForever"
                                                            onClick={() => onDeleteLibraryMap(libraryMap)}>
                                                    <Clear/>
                                                </IconButton>
                                            </Tooltip>
                                        }/>
                                        <CardActionArea onClick={() => openImageModal(index)}>
                                            <CardMedia style={{
                                                height: 0,
                                                paddingTop: '56.25%',
                                            }} image={libraryMap.image_url}
                                                       title={libraryMap.name}/>
                                        </CardActionArea>
                                        <CardActions>
                                            <input
                                                accept="image/*"
                                                id="raised-button-file"
                                                name="file"
                                                type="file"
                                                style={{display: "none"}}
                                                onChange={(e) => onChangeFile(e, libraryMap)}
                                            />
                                            <label htmlFor="raised-button-file" style={{margin: "auto"}}>
                                                <Button
                                                    startIcon={<Publish/>}
                                                    component="span"
                                                    variant="contained"
                                                    color="primary"

                                                > Upload Image in png/jpg</Button>
                                            </label>

                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>


            </Box>
            <Suspense fallback={<div>Loading...</div>}>
                <ImageModal
                    showPreview
                    showIndex
                    activeIndex={0}
                    images={libraryMaps.map(libraryMap => {
                        return {src: libraryMap.image_url, title: libraryMap.name,}
                    })}
                    ref={imageModal}/>
            </Suspense>

            <Dialog
                open={openConfirmationDialog}
                onClose={onCloseDialog}
            >
                <DialogTitle>
                    Are you sure you want to delete the map?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This operation cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmRemoveMap} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

EditLibraryMapCard.propTypes = {
    libraryMaps: PropTypes.array,
    onShowSuccessSnackbar: PropTypes.func,
    onShowErrorSnackbar: PropTypes.func,
    onUpdateLibraryMap: PropTypes.func
};

export default EditLibraryMapCard;
