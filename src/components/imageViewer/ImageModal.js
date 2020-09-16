import ImageViewer from "./imageViewer";
import React, {Component} from "react";
import './style.css';




interface ModalProps {
    images: Image[];
    prefixCls?: string;
    className?: string;
    // Bottom indicators preview
    showPreview?: boolean;
    // Toolbar index indicator
    showIndex?: boolean;
}

class ImageModal extends Component<ModalProps, any> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {
            visible: false,
            activeIndex: undefined
        }
    }

    open(activeIndex?: number) {
        this.setState({
            visible: true,
            activeIndex: activeIndex || 0
        });
    }

    close() {
        this.setState({
            visible: false,
            activeIndex: undefined
        })
    }

    render() {
        const {
            images,
            prefixCls,
            className,
            showIndex,
            showPreview
        } = this.props;
        const { activeIndex } = this.state;

        return this.state.visible ? (
            <div className='modal'>
                <ImageViewer
                    showPreview={showPreview}
                    showIndex={showIndex}
                    prefixCls={prefixCls}
                    activeIndex={activeIndex}
                    images={images}/>
                <div className='close-button'
                     onClick={this.close.bind(this)}>
                </div>
            </div>
        ) : null;
    }
}

export default ImageModal;