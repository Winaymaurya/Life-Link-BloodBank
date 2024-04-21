import historyModel from "../model/historyModel.js"

export const createHistoryController=async(req,res)=>{
    try {
        const {donarId,receiverId}=req.body
        if( !donarId || !receiverId){
            return res.status(200).send({
                success:false,
                message:"Give both the Data"
            })
        }

        const existingHistory=await historyModel.findOne({donarId})
        if(existingHistory){
         return res.status(200).send({
             success:false,
             message:"History already exist"
         })
        }
    const history=await new historyModel(req.body).save();
    res.status(201).send({
        success:true,
        message:"History created",
        history
    })


    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in creating history"
        })
    }
}

export const getHistoryController=async(req,res)=>{
    try {
        const {donarId}=req.query
      
        const history=await historyModel.find({donarId}).populate("receiverId").populate("donarId")

        if(!history){

            res.status(200).send({
                success:true,
                message:"No History to show",
            })
        }
        res.status(200).send({
            success:true,
            message:"History Fetched",
            history
        })
       
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Something went wrong in getting history"
        })
    }

}