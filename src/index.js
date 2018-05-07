const { GraphQLServer } = require('graphql-yoga')
// const typeDefs = require('./schema.graphql')

let links = [{
    id:'link-0',
    description: 'this is first link description',
    url: 'http://link-url.com'
}]

let linkCount = links.length;

const resolvers = {
    Query: {
        info:() => 'some info',
        feed: () => links,
        link:(root,args)=> {
          return links.find(link => link.id === args.id )
        }
    },
    Mutation: {
        post:(root,args) => {
            const link = {
                id: `link-${linkCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
        },
        updatePost:(root,args) => {
         let updatedLink;   
         links.forEach(link => {
             if(link.id ===args.id){
                 link.url =args.url
                 link.description =args.description
                 updatedLink = link
                
             }
         })
         return updatedLink
        },
        deletePost:(root, args) => {
         const linkToDelete = links.find(link => link.id === args.id)
         links = links.filter(link => link.id !== args.id)
         return linkToDelete
        }
        
    }

}

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers
})

server.start(() => console.log('Server started at post 4000'))