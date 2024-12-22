const FeatureImage = require('../../model/Feature')
const cloudinary = require('cloudinary').v2;




const addFeature = async (req, res) => {
    try {
        const { image } = req.body;

        const featureimages = new FeatureImage({
            image
        })

        await featureimages.save()

        res.status(200).json({
            success: true,
            message: "feature added",
            data: featureimages
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}


const getFeature = async (req, res) => {
    try {

        const images = await FeatureImage.find({})

        res.status(200).json({
            success: true,
            data: images
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "some error ocurred!"
        })
    }
}


const deleteImage = async (req, res) => {
    try {
        const image = await FeatureImage.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

    
        // Delete from Cloudinary
        if (image !== null && '') {
            // Extract public_id from the image URL
            const urlParts = image.image.split('/');
            const public_id_with_extension = urlParts[urlParts.length - 1];  // pl6carajxpepgdke2zd8.jpg
            const public_id = public_id_with_extension.split('.')[0];  // pl6carajxpepgdke2zd8

            const result = await cloudinary.uploader.destroy(public_id);
            if (result.result !== 'ok') {
                return res.status(500).json({ message: 'Failed to delete from Cloudinary' });
            }
        } else {
            await FeatureImage.findByIdAndDelete(req.params.id);
            res.json({
                success: true,
                message: 'Image deleted successfully'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { addFeature, getFeature, deleteImage }