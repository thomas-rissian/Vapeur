const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Editor = require("../model/Editor");

class EditorDAO{
    /**
     * Obtenir tous les editeurs
     * @return list d'objet Editor
     */
    async findAll(){
        try{
            const editors = await prisma.editor.findMany({
                orderBy: {
                    name: 'asc',
                },
            })
            return editors.map(editor => new Editor(editor));
        }catch(error){
            console.error("Editor BDD: findAll", error);
        }
    }
    /**
     * Obtenir un editeur
     * @param int id
     * @return Editor
     */
    async findById(id){
        try{
            id = parseInt(id);
            const editor = await prisma.editor.findUnique({
                where:{
                    id: id,
                }
            });
            if(!editor){
                return new Editor();
            }
            return new Editor(editor);
        }catch(error){
            console.error("Editor BDD: findById", error);
        }
    }
    /**
     * Insert editor
     * @param editor
     */
    async createEditor(editor){
        try{
            await prisma.editor.create({
                data : editor.toJson(),
             });
        }catch(error){
            console.error("Editor BDD: createEditor", error);
        }
    }
    /**
     * Update editor
     * @param editor
     */
    async modifyEditor(editor){
        try{
            await prisma.editor.update({
                data : editor.toJson(),
                where:{
                    id: editor.id,
                }
             });
        }catch(error){
            console.error("Editor BDD: modifyEditor", error);
        }
    }
    /**
     * Delete
     * @param id
     */
    async deleteEditor(id){
        try{
            id = parseInt(id);
            await prisma.editor.delete({
                where:{
                    id: id,
                }
             });
        }catch(error){
            console.error("editor BDD: deleteEditor", error);
        }
    }
}
module.exports = new EditorDAO();