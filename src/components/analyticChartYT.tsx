/** @format */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "./icon";
import { formatNumber } from "@util/numberPrettier";
import Loading from "./loading";
import Link from "next/link";
import styles from "@style/components/analytic.module.css";

interface analyticsProps {
  statistics: any;
  brandingSettings: any;
  contentDetails: any;
  snippet: any;
}

interface latestVideo {
  kind: any;
  etag: any;
  id: any;
  snippet: any;
}

const AnalyticsChart = ({ channelId }: { channelId: string }) => {
  const [analyticsData, setAnalyticsData] = useState<analyticsProps>();
  const [latestVideo, setlatestVideo] = useState<latestVideo[]>();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          `/api/youtube/chart?channelId=${channelId}`,
          {
            method: "GET",
          }
        );

        const response2 = await fetch(`/api/youtube?channelId=${channelId}`, {
          method: "GET",
        });

        const data = await response.json();
        const data2 = await response2.json();
        setlatestVideo(data2.items);
        setAnalyticsData(data.items[0]);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, [channelId]);

  if (!analyticsData) return <Loading />;
  return (
    <div className={styles.analytic_layout}>
      <h1>Home</h1>
      <section className={styles.channel_detail}>
        <div className={styles.channel_detail_card}>
          <Image
            src={analyticsData.snippet.thumbnails.default.url}
            alt="thumbnail"
            width={60}
            height={60}
            className="rounded"
          />
          <div className={styles.channel_detail_card_data}>
            <h4>
              {analyticsData.snippet.title}
              <span> {analyticsData.snippet.customUrl}</span>
            </h4>

            <p>{analyticsData.snippet.description}</p>
            <div className={styles.channel_detail_cta}>
              <button className="secondary">
                <Icon variant="Youtube" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.chart_layout}>
        <div className={styles.chart_layout_card}>
          <p>Subscribers</p>
          <h5>{formatNumber(analyticsData.statistics.subscriberCount)}</h5>
          <span>+2% from last month</span>
          <div className={styles.icon}>
            <Icon variant="Person" />
          </div>
        </div>
        <div className={styles.chart_layout_card}>
          <p>Views</p>
          <h5>{formatNumber(analyticsData.statistics.viewCount)}</h5>
          <span>+30% from last month</span>
          <div className={styles.icon}>
            <Icon variant="Eye" />
          </div>
        </div>
        <div className={styles.chart_layout_card}>
          <p>Videos</p>
          <h5>{formatNumber(analyticsData.statistics.videoCount)}</h5>
          <span>+14% from last month</span>
          <div className={styles.icon}>
            <Icon variant="Video" />
          </div>
        </div>
      </section>
      <section>
        <h5>Latest Uploaded</h5>
        <div className={styles.latest_video_layout}>
          {latestVideo?.map((video) => (
            <div
              className={styles.latest_video_card}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url(${video.snippet.thumbnails.high.url})`,
              }}
            >
              <span>{video.snippet.title}</span>
              <div className={styles.link_cta}>
                <Link
                  href={`https://youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                >
                  <button className="secondary">
                    <Icon variant="Link" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AnalyticsChart;
