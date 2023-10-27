import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Chip,
  Card,
  CardBody,
  List,
  ListItem,
} from "@material-tailwind/react";
import { Arrow, Loading } from "../icons/icons";
import { InfoCard } from "./InfoCard";

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

export function InfoAccordions({ search_results, loading }) {
  const [open, setOpen] = useState(false);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div>
      {/* # Sources */}
      {search_results !== undefined && "organic" in search_results && (
      <Accordion
        open={open === 1}
        animate={CUSTOM_ANIMATION}
        icon={<Arrow id={1} open={open} />}
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="rounded-md border-2  p-5 shadow-lg"
        >
          <div class="flex flex-row items-center">
            <Chip
              value={search_results.organic.length}
              size="sm"
              variant="ghost"
              color="blue-gray"
              className={
                loading
                  ? "hidden transition-transform"
                  : "visible rounded-full transition-transform"
              }
            />
            <Loading loading={loading} />
            <h2 class="pl-4">Sources</h2>
          </div>
        </AccordionHeader>
        <AccordionBody className="source-cards grid grid-cols-3 gap-4 p-6 border-b-2 bg-gray-100 shadow-lg rounded-b-lg overflow-y-scroll h-72">
          {search_results.organic.map((source) => (
            <InfoCard source={source} />
          ))}
        </AccordionBody>
      </Accordion>
      )}

      {/* # Top Stories */}

      {search_results !== undefined && "topStories" in search_results && (
        <Accordion
          open={open === 2}
          animate={CUSTOM_ANIMATION}
          icon={<Arrow id={2} open={open} />}
        >
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="rounded-md border-2 mt-4 p-5 shadow-lg"
          >
            <div class="flex flex# Sources-row items-center">
              <Chip
                value={search_results.topStories.length}
                size="sm"
                variant="ghost"
                color="blue-gray"
                className={
                  loading
                    ? "hidden"
                    : "visible rounded-full transition-transform"
                }
              />
              <Loading loading={loading} />
              <h2 class="pl-4">Top Stories</h2>
            </div>
          </AccordionHeader>
          <AccordionBody className="source-cards grid grid-cols-3 gap-4 p-6 border-b-2 bg-gray-100 shadow-lg rounded-b-lg overflow-y-scroll h-72">
            {search_results.topStories.map((source) => (
              <InfoCard source={source} />
            ))}
          </AccordionBody>
        </Accordion>
      )}

      {/* # People are also asking */}

      {search_results !== undefined && "peopleAlsoAsk" in search_results && (
        <Accordion
          open={open === 3}
          animate={CUSTOM_ANIMATION}
          icon={<Arrow id={3} open={open} />}
        >
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className="rounded-md border-2 mt-4 p-5 shadow-lg"
          >
            <div class="flex flex-row items-center">
              <Chip
                value={search_results.peopleAlsoAsk.length}
                size="sm"
                variant="ghost"
                color="blue-gray"
                className={
                  loading
                    ? "hidden"
                    : "visible rounded-full transition-transform"
                }
              />
              <Loading loading={loading} />
              <h2 class="pl-4">People are also asking</h2>
            </div>
          </AccordionHeader>
          <AccordionBody className="grid grid-cols-4 gap-4 p-6 border-b-2 bg-gray-100 shadow-lg rounded-b-lg overflow-y-scroll h-72">
            {search_results.peopleAlsoAsk.map((source) => (
              <InfoCard source={source} />
            ))}
          </AccordionBody>
        </Accordion>
      )}

      {/* # Related Searches */}

      {search_results !== undefined && "relatedSearches" in search_results && (
        <Accordion
          open={open === 4}
          animate={CUSTOM_ANIMATION}
          icon={<Arrow id={4} open={open} />}
        >
          <AccordionHeader
            onClick={() => handleOpen(4)}
            className="rounded-md border-2 mt-4 p-5 shadow-lg"
          >
            <div class="flex flex-row items-center">
              <Chip
                value={search_results.relatedSearches.length}
                size="sm"
                variant="ghost"
                color="blue-gray"
                className={
                  loading
                    ? "hidden"
                    : "visible rounded-full transition-transform"
                }
              />
              <Loading loading={loading} />
              <h2 class="pl-4">Related Searches</h2>
            </div>
          </AccordionHeader>
          <AccordionBody className="p-6 border-b-2 bg-gray-100 shadow-lg overflow-y-scroll h-72">
            <Card className="w-full">
              <CardBody>
                <List>
                  {search_results.relatedSearches.map((question) => (
                    <ListItem>
                      <a
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        href={`https://www.google.ca/search?q=${question.query}`}
                      >
                        {question.query}
                      </a>
                    </ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
          </AccordionBody>
        </Accordion>
      )}
    </div>
  );
}
