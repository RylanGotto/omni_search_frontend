import {
    Typography,
    Card,
    CardBody,
} from "@material-tailwind/react";

export function InfoCard({source}) {
    let site_links = null;
    
    if ("sitelinks" in source) {
        site_links = (<Typography>
            <h6 class="font-bold underline">Additional Sources</h6>
            <ul class="list-disc pl-4">
                {source.sitelinks.map(link => (
                    <li><a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={link.link}>{link.title}</a></li>
                ))}
            </ul>
        </Typography>);
    }

    return (
        <Card className="source-card">
            <CardBody className="source-card-body">
                    {"source" in source && <span className="font-bold underline">{source.source}</span>}
                    {"imageUrl" in source && <img className="float-left p-4 rounded-md" src={source.imageUrl} />}
                    {"date" in source && <Typography variant="small" class="font-bold underline">{source.date}</Typography>}
                    <Typography variant="h5">
                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={source.link}>{source.title}</a>
                    </Typography>
                    <Typography variant="p">
                        {source.snippet ? source.snippet : null}
                    </Typography>
                <div class="source-site-links">
                    {site_links ? site_links : ""}
                </div>
            </CardBody>
        </Card>
    )
}