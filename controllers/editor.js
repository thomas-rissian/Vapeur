
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const list = async (req, res) =>{
    try{
        const editors = await prisma.editor.findMany();
        res.render("./editor/index",{editors});
    }catch(error){  
        console.error("error editorList", error);
        res.status(500).send("Error List Editor don't work");
    }
};
const create = async (req, res) =>{
    try{
        await prisma.editor.create({
            data: req.body
        });
        res.status(201).redirect('/editor');
    }catch(error){
        console.error("error create editor", error);
        res.status(500).send("Error Create editor don't work");
    }
};
const createForm = async (req, res) =>{
    try{
        res.render("./editor/create");
    }catch(error){
        console.error("error createForm editor", error);
        res.status(500).send("Error Create Form Editor don't work");
    }
};

const deleteEditor = async (req, res)=>{
    try{
        const games = await prisma.game.count({
            where:{
                editorId: parseInt(req.params.id),
            }
        })
        if(!games){
            await prisma.editor.delete({
                where:{
                    id: parseInt(req.params.id),
                }
            })
        }else{
            
        }
        
        res.status(200).redirect("/editor");
    }catch(error){
        console.error("error delete editor", error);
        res.status(500).send("Error delete editor don't work");
    }
}
module.exports = {
    list,
    create,  
    createForm,  
    deleteEditor,
}