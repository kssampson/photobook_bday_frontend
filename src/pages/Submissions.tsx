import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import UserCard from "../components/UserCard";
import Quill from "quill";
import { useCallback, useEffect, useRef, useState } from "react";
import getSubmissions from "../utils/getSubmissions";
const Delta = Quill.import('delta');

interface Submission {
  id: string;
  username: string;
  photoUrl: string;
  letterContent: any;
}


const Submissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

//   const sampleUsers = [
//     {
//     username: "John Doe",
//     photoUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
//     letterContent: {
//       ops: [
//         { attributes: { color: "#454545" }, insert: "I’ll never forget seeing you for the first time on stage..." },
//         { insert: "\n" },
//         { attributes: { color: "#454545" }, insert: "And by the way…40 ain’t no big thang 😉" },
//         { insert: "\n\n" },
//         { attributes: { color: "#454545" }, insert: "Love - Caroline ❣️" },
//         { insert: "\n\n" }
//       ]
//     }
//   },
//   {
//     username: "Jane Smith",
//     photoUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80",
//     letterContent: { ops: [{ insert: "Jane's letter content goes here." }] },
//   },
// ];

const loadSubmissions = useCallback(async () => {
  if (loading || !hasMore) return;
  setLoading(true);
  const token = localStorage.getItem("token")
if (token) {
  try {
    const data = await getSubmissions(token, page, 10);
    if (data) {
      setSubmissions((prev) => [...prev, ...data.submissions])
      setHasMore(data.hasMore);
      setPage((prevPage) => prevPage + 1);
    }
  } catch (error) {
    console.error("Error loading submissions:", error);
  } finally {
    setLoading(false);
  }
}
}, [page, loading, hasMore]);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore) {
      loadSubmissions();
    }
  })
  if (observerRef.current) observer.observe(observerRef.current);
  return () => observer.disconnect();
}, [loadSubmissions, hasMore])

  return (
    <Box
      padding={{base: 4, md: 8}}
      overflowY={"auto"}
      // maxHeight="calc(100vh - 20px)"
    >
      <VStack>
        {submissions.map((submission, idx) => (
          <UserCard
            username={submission.username}
            photoUrl={submission.photoUrl}
            letterContent={submission.letterContent}
            key={idx}
          />
        ))}
      </VStack>
      {loading && <Spinner marginY={4} />}

      <div ref={observerRef} style={{ height: '1px' }} />
    </Box>
  )
}

export default Submissions;