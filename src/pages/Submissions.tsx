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