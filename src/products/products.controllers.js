export const getAllProducts = async (req, res) => {
    try {
        
    } catch (error) {
        
        console.log("error getting all products", error)
        return res.status(500).json({error: "internal error"})
    }
};


export const addProducts = (req, res) => {
    try {
        
    } catch (error) {
        
        console.log("error adding products", error)
        return res.status(500).json({error: "internal server error"});
    }
};


export const deleteProducts = (params) => {
    try {
        
    } catch (error) {
        
        console.log("error deleting products", error)
        return res.status(500).json({error: "internal server error"});
    }
};