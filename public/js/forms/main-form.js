export const buildMainForm = async () => {
  const mainContainer = document.createElement("div");
  mainContainer.id = "main-container";
  mainContainer.innerHTML = "";

  const navElement = await buildNavBar();
  const contentSection = await buildContentSection();

  mainContainer.append(navElement, contentSection);

  return mainContainer;
};

export const buildNavBar = async () => {
  const nav = document.createElement("nav");
  nav.className = "navbar";

  const navInner = document.createElement("div");
  navInner.className = "nav-inner";

  const logo = document.createElement("a");
  logo.className = "nav-logo";
  logo.href = "/";
  logo.textContent = "Margin"; // replace with your site name

  const navLine = document.createElement("div");
  navLine.className = "nav-divider";

  const navRight = document.createElement("div");
  navRight.className = "nav-right";

  const signInBtn = await buildNavSignInButton();
  const writeBtn = await buildNavWriteButton();

  navRight.append(signInBtn, writeBtn);
  navInner.append(logo, navRight);
  nav.append(navInner, navLine);

  return nav;
};

export const buildNavSignInButton = async () => {
  const btn = document.createElement("button");
  btn.className = "btn-sign-in";
  btn.setAttribute("data-label", "sign-in");
  btn.textContent = "Sign in";
  return btn;
};

export const buildNavWriteButton = async () => {
  const btn = document.createElement("button");
  btn.className = "btn-write";
  btn.setAttribute("data-label", "write-post");
  btn.textContent = "Write";
  return btn;
};

// ─── CONTENT SECTION ──────────────────────────────────────────────────────────

export const buildContentSection = async () => {
  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container";

  const tabBar = await buildTabBar();
  const tabDivider = document.createElement("div");
  tabDivider.className = "tab-divider";

  const feed = await buildFeed();

  contentContainer.append(tabBar, tabDivider, feed);

  return contentContainer;
};

// ─── TAB BAR ──────────────────────────────────────────────────────────────────

export const buildTabBar = async () => {
  const tabs = document.createElement("div");
  tabs.className = "tab-bar";

  const tabItems = [
    { label: "For you", value: "for-you", active: true },
    { label: "New", value: "new" },
    { label: "Following", value: "following" },
    { label: "Tech", value: "tech" },
    { label: "Culture", value: "culture" },
    { label: "Essays", value: "essays" },
  ];

  for (let i = 0; i < tabItems.length; i++) {
    const tab = document.createElement("button");
    tab.className = "feed-tab" + (tabItems[i].active ? " active" : "");
    tab.setAttribute("data-label", "feed-tab");
    tab.setAttribute("data-tab", tabItems[i].value);
    tab.textContent = tabItems[i].label;
    tabs.append(tab);
  }

  return tabs;
};

// ─── FEED ─────────────────────────────────────────────────────────────────────

export const buildFeed = async () => {
  const feed = document.createElement("div");
  feed.className = "feed";
  feed.id = "post-feed";

  // Placeholder posts for the mockup.
  // In production, replace postDataArray with real data from your API/DB.
  const postDataArray = [
    {
      postId: "post-001",
      authorName: "Elena Vasquez",
      authorInitials: "EV",
      authorColorClass: "av-orange",
      timeAgo: "3h",
      title: "The Case Against Startup Culture",
      preview:
        "For fifteen years, I believed the mythology. I raised three rounds, hired two hundred people, and watched everything collapse in slow motion.",
      minutesRemaining: 8,
      price: "$1.99",
      likes: "2.4k",
      comments: "142",
      readTime: "10 min",
      isFeatured: true,
    },
    {
      postId: "post-002",
      authorName: "David Kim",
      authorInitials: "DK",
      authorColorClass: "av-blue",
      timeAgo: "6h",
      title: "Why Remote Work Failed the People It Was Supposed to Save",
      preview:
        "The promise was radical: liberation from the office, from commutes, from pants with buttons. What filled the void was an always-on culture that followed us home.",
      minutesRemaining: 6,
      price: "$0.99",
      likes: "1.8k",
      comments: "89",
      readTime: "8 min",
      isFeatured: false,
    },
    {
      postId: "post-003",
      authorName: "Priya Nair",
      authorInitials: "PN",
      authorColorClass: "av-green",
      timeAgo: "1d",
      title: "The Last Analog City",
      preview:
        'There is a cafe in old Tbilisi where the wifi is intentionally bad. "People come here to remember how to be bored," the owner told me. "Boredom is where the interesting thoughts live."',
      minutesRemaining: 14,
      price: "$2.49",
      likes: "5.1k",
      comments: "214",
      readTime: "16 min",
      isFeatured: false,
    },
    {
      postId: "post-004",
      authorName: "Tom Sinclair",
      authorInitials: "TS",
      authorColorClass: "av-purple",
      timeAgo: "2d",
      title: "Grief in the Time of Social Media",
      preview:
        "My father died on a Tuesday. By Thursday, condolences were flooding my notifications. People I hadn't spoken to in a decade were leaving emojis on photos I didn't remember posting.",
      minutesRemaining: 9,
      price: "$1.49",
      likes: "7.2k",
      comments: "312",
      readTime: "11 min",
      isFeatured: false,
    },
    {
      postId: "post-005",
      authorName: "Marcus Webb",
      authorInitials: "MW",
      authorColorClass: "av-orange",
      timeAgo: "3d",
      title: "The Hidden Economics of Creative Work in the Age of AI",
      preview: "What happens when the tools that promised to democratize creation begin to commoditize the creators themselves?",
      minutesRemaining: 12,
      price: "$1.99",
      likes: "3.9k",
      comments: "187",
      readTime: "14 min",
      isFeatured: false,
    },
  ];

  for (let i = 0; i < postDataArray.length; i++) {
    const postCard = await buildPostCard(postDataArray[i]);
    feed.append(postCard);
  }

  return feed;
};

// ─── POST CARD ─────────────────────────────────────────────────────────────────

export const buildPostCard = async (postData) => {
  const post = document.createElement("div");
  post.className = "post-card" + (postData.isFeatured ? " featured" : "");
  post.setAttribute("data-post-id", postData.postId);

  if (postData.isFeatured) {
    const featuredBadge = await buildFeaturedBadge();
    post.append(featuredBadge);
  }

  const postHeader = await buildPostCardHeader(postData);
  const postTitle = await buildPostCardTitle(postData);
  const postPreview = await buildPostCardPreview(postData);
  const paywallBar = await buildPaywallBar(postData);
  const postFooter = await buildPostCardFooter(postData);

  post.append(postHeader, postTitle, postPreview, paywallBar, postFooter);

  return post;
};

export const buildFeaturedBadge = async () => {
  const badge = document.createElement("div");
  badge.className = "featured-badge";
  badge.textContent = "✦ Top story today";
  return badge;
};

export const buildPostCardHeader = async (postData) => {
  const header = document.createElement("div");
  header.className = "post-header";

  const avatar = document.createElement("div");
  avatar.className = "post-avatar " + postData.authorColorClass;
  avatar.textContent = postData.authorInitials;

  const authorName = document.createElement("span");
  authorName.className = "post-author-name";
  authorName.textContent = postData.authorName;

  const timeAgo = document.createElement("span");
  timeAgo.className = "post-time-ago";
  timeAgo.textContent = postData.timeAgo;

  header.append(avatar, authorName, timeAgo);

  return header;
};

export const buildPostCardTitle = async (postData) => {
  const title = document.createElement("h2");
  title.className = "post-title";
  title.setAttribute("data-label", "post-card-click");
  title.setAttribute("data-post-id", postData.postId);
  title.textContent = postData.title;
  return title;
};

export const buildPostCardPreview = async (postData) => {
  const preview = document.createElement("p");
  preview.className = "post-preview";
  preview.setAttribute("data-label", "post-card-click");
  preview.setAttribute("data-post-id", postData.postId);
  preview.textContent = postData.preview;
  return preview;
};

// ─── PAYWALL BAR ──────────────────────────────────────────────────────────────

export const buildPaywallBar = async (postData) => {
  const bar = document.createElement("div");
  bar.className = "paywall-bar";

  const label = document.createElement("div");
  label.className = "paywall-label";

  const lockIcon = document.createElement("span");
  lockIcon.className = "paywall-lock-icon";
  lockIcon.textContent = "🔒";

  const labelText = document.createElement("span");
  labelText.textContent = `${postData.minutesRemaining} min left to read`;

  label.append(lockIcon, labelText);

  const unlockBtn = await buildUnlockButton(postData);

  bar.append(label, unlockBtn);

  return bar;
};

export const buildUnlockButton = async (postData) => {
  const btn = document.createElement("button");
  btn.className = "btn-unlock";
  btn.setAttribute("data-label", "unlock-post");
  btn.setAttribute("data-post-id", postData.postId);
  btn.textContent = `Unlock · ${postData.price}`;
  return btn;
};

// ─── POST FOOTER ──────────────────────────────────────────────────────────────

export const buildPostCardFooter = async (postData) => {
  const footer = document.createElement("div");
  footer.className = "post-footer";

  const likeBtn = await buildStatButton("♡", postData.likes, "like-post", postData.postId);
  const commentBtn = await buildStatButton("💬", postData.comments, "view-comments", postData.postId);
  const shareBtn = await buildStatButton("↗", null, "share-post", postData.postId);

  const readTimePill = document.createElement("span");
  readTimePill.className = "read-time-pill";
  readTimePill.textContent = postData.readTime;

  footer.append(likeBtn, commentBtn, shareBtn, readTimePill);

  return footer;
};

export const buildStatButton = async (icon, count, label, postId) => {
  const btn = document.createElement("button");
  btn.className = "stat-btn";
  btn.setAttribute("data-label", label);
  btn.setAttribute("data-post-id", postId);

  const iconSpan = document.createElement("span");
  iconSpan.textContent = icon;

  btn.append(iconSpan);

  if (count) {
    const countSpan = document.createElement("span");
    countSpan.textContent = count;
    btn.append(countSpan);
  }

  return btn;
};
