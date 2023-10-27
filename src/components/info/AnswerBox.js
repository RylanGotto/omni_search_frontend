import { Card, CardHeader, CardBody } from "@material-tailwind/react";

export function AnswerBox({answer}) {

    return (
        <div class="w-64">
            <Card class="w-64">
                <CardHeader color="lightBlue">
                    {answer.title}
                </CardHeader>
                <CardBody>
                    <p className="text-gray-600">{answer.answer}</p>
                </CardBody>
            </Card>
        </div>
    );
}