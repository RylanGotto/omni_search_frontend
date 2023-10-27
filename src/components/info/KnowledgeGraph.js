import {
    Card,
    CardBody,
    CardFooter,
    Button,
    List,
    ListItem,
    Typography,
} from "@material-tailwind/react";

export function KnowledgeGraph({knowledge}) {

    knowledge = knowledge[0];
    let attribute_link = null;
    
    if ("attributes" in knowledge) {
        attribute_link = (<List>
            {Object.entries(knowledge.attributes).map(attr => (
                <ListItem className="border-b-2 shadow-lg p-4 flex-wrap rounded-lg "><span class="font-bold underline  mr-4 mb-4 w-full">{attr[0]}</span>{attr[1]}</ListItem>
            ))}
        </List>);
    }

    return (
        <div class="knowledge-graph">
            <Card className="mr-4 ">
                <CardBody class="p-4">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={knowledge.website}>{knowledge.title} - {knowledge.type}</a>
                    </Typography>
                    <div className="knowledge-graph-img">
                        <img
                            src={knowledge.imageUrl}
                            alt="card-image"
                            class="rounded-lg float-left mr-4"
                        />

                        <Typography>
                            {knowledge.description}
                        </Typography>
                    </div>
                    {attribute_link ? attribute_link : ""}

                </CardBody>
                <CardFooter className="pt-6">
                    <a href={knowledge.descriptionLink}>
                        <Button className="w-full">{knowledge.descriptionSource}</Button>
                    </a>
                </CardFooter>
            </Card>
        </div>
    )
}