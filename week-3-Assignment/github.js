
const input = document.getElementById('username');
const statusText = document.getElementById('status');
const card = document.getElementById('profileCard');
const reposList = document.getElementById('reposList');

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', getUser);

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getUser();
  }
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

async function getUser() {
  const username = input.value.trim();
  if (!username) return;

  card.style.display = 'none';
  statusText.classList.remove('error');
  statusText.innerHTML = '<div class="spinner"></div> Loading...';

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.status === 404) throw new Error('User Not Found');

    const data = await res.json();

    
    document.getElementById('avatar').src = data.avatar_url;
    document.getElementById('name').innerText = data.name || data.login;
    document.getElementById('bio').innerText = data.bio || 'No bio available';

    document.getElementById('joinDate').innerText = `Joined: ${formatDate(data.created_at)}`;
    document.getElementById('portfolio').innerText = `Portfolio: ${data.blog || 'No portfolio available'}`;
    document.getElementById('profileLink').href = data.html_url;

   
    const repoRes = await fetch(data.repos_url);
    const repos = await repoRes.json();

  
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    
        reposList.innerHTML = '';
        repos.slice(0, 5).forEach(repo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <div class="repo-date">⭐ ${repo.stargazers_count} • ${formatDate(repo.created_at)}</div>      `;
        reposList.appendChild(li);
        });

    card.style.display = 'block';
    statusText.innerText = '';

  } catch (err) {
    statusText.innerText = '❌ User Not Found';
    statusText.classList.add('error');
  }
}
