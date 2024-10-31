import AnimationExample from "@/components/animation";
import RateYourExperience from "@/components/rate_experience/rate_experience";

export default function Home() {
  return (
    <div className="flex flex-col">
      <AnimationExample
        title="Rate your experience"
        description={
          <span>
            Feedback component inspired by this{" "}
            <a
              href=" https://dribbble.com/shots/23563745-Feedback-Interaction"
              target="_blank"
            >
              incredible work
            </a>{" "}
            of Vishnu Prasad.
          </span>
        }
      >
        <RateYourExperience></RateYourExperience>
      </AnimationExample>
    </div>
  );
}
